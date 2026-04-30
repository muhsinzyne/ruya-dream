import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { checkLimit } from '@/lib/rateLimit';
import { processDream } from '@/lib/ai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { device_id, dream_text } = body;

    if (!device_id || !dream_text) {
      return NextResponse.json(
        { error: 'device_id and dream_text are required' },
        { status: 400 }
      );
    }

    // Input sanitization
    dream_text = dream_text.trim();
    if (dream_text.length > 1000) {
      dream_text = dream_text.substring(0, 1000); // Or reject entirely
    }
    
    if (dream_text.length === 0) {
      return NextResponse.json({ error: 'Dream text cannot be empty' }, { status: 400 });
    }

    // Rate limiting check
    const isAllowed = await checkLimit(device_id);
    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Maximum 2 requests per day.' },
        { status: 429 }
      );
    }

    // Insert into dream_requests (status 'pending')
    const ip_address = req.headers.get('x-forwarded-for') || 'unknown';
    
    const [requestResult]: any = await pool.query(
      'INSERT INTO dream_requests (device_id, ip_address, dream_text, status, created_at) VALUES (?, ?, ?, ?, NOW())',
      [device_id, ip_address, dream_text, 'pending']
    );

    const request_id = requestResult.insertId;

    let aiResult;
    try {
      // Process with AI
      aiResult = await processDream(dream_text);
      
      // Store result in dream_results
      const { islamic_interpretation, scientific_explanation } = aiResult;
      
      await pool.query(
        `INSERT INTO dream_results 
        (request_id, islamic_summary, islamic_symbols, islamic_notes, scientific_summary, scientific_factors, scientific_notes, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          request_id,
          islamic_interpretation.summary || '',
          JSON.stringify(islamic_interpretation.symbols || []),
          islamic_interpretation.notes || '',
          scientific_explanation.summary || '',
          JSON.stringify(scientific_explanation.psychological_factors || []),
          scientific_explanation.notes || ''
        ]
      );

      // Update request status to completed
      await pool.query(
        'UPDATE dream_requests SET status = ? WHERE id = ?',
        ['completed', request_id]
      );

      return NextResponse.json(
        { 
          message: 'Dream successfully analyzed', 
          request_id,
          result: aiResult
        },
        { status: 201 }
      );
    } catch (aiError) {
      console.error("AI Processing failed:", aiError);
      
      // Update request status to failed
      await pool.query(
        'UPDATE dream_requests SET status = ? WHERE id = ?',
        ['failed', request_id]
      );

      return NextResponse.json(
        { error: 'Failed to analyze the dream due to an AI service error' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in dream submission API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
