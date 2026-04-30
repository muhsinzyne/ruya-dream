import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import wkhtmltopdf from 'wkhtmltopdf';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const requestId = searchParams.get('requestId');

  if (!requestId) {
    return NextResponse.json({ error: 'requestId is required' }, { status: 400 });
  }

  try {
    // Fetch dream and results
    const [rows]: any = await pool.query(
      `SELECT r.*, res.* 
       FROM dream_requests r 
       JOIN dream_results res ON r.id = res.request_id 
       WHERE r.id = ?`,
      [requestId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    const data = rows[0];

    // Generate HTML for wkhtmltopdf
    // Using inline styles and basic layout as wkhtmltopdf uses an older WebKit engine
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica', 'Arial', sans-serif; color: #1a1917; line-height: 1.6; padding: 40px; background: #fff; }
          .header { text-align: center; border-bottom: 2px solid #e5e2d9; padding-bottom: 20px; margin-bottom: 30px; }
          .title { font-size: 28px; color: #4a3f30; margin: 0; text-transform: uppercase; letter-spacing: 1px; }
          .date { font-size: 12px; color: #9d9389; margin-top: 5px; }
          .dream-section { background: #f8f7f4; border-left: 5px solid #6b5b47; padding: 25px; margin-bottom: 40px; font-style: italic; font-size: 16px; }
          .section-container { margin-bottom: 40px; page-break-inside: avoid; }
          .section-title { font-size: 20px; border-bottom: 2px solid #eee; padding-bottom: 8px; margin-bottom: 15px; font-weight: bold; }
          .islamic-title { color: #6b5b47; border-color: #6b5b47; }
          .scientific-title { color: #c9a96e; border-color: #c9a96e; }
          .content { font-size: 14px; margin-bottom: 20px; text-align: justify; }
          .tag-box { margin-top: 15px; padding: 10px; background: #fafafa; border: 1px solid #eee; }
          .tag-label { font-size: 11px; font-weight: bold; color: #9d9389; text-transform: uppercase; margin-bottom: 5px; display: block; }
          .tags { font-size: 13px; color: #4a3f30; }
          .notes { font-size: 12px; font-style: italic; color: #7a7268; margin-top: 15px; line-height: 1.4; }
          .footer { margin-top: 60px; font-size: 10px; color: #9d9389; text-align: center; border-top: 1px solid #eee; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">Ruya Dream Analysis Report</h1>
          <p class="date">Report ID: #${requestId} | Date: ${new Date(data.created_at).toLocaleDateString()}</p>
        </div>

        <div class="dream-section">
          <strong>User's Dream Description:</strong><br>
          "${data.dream_text}"
        </div>

        <div class="section-container">
          <h2 class="section-title islamic-title">🌙 Islamic Scholarly Perspective</h2>
          <div class="content">${data.islamic_summary}</div>
          
          <div class="tag-box">
            <span class="tag-label">Traditional Symbols Identified</span>
            <div class="tags">
              ${JSON.parse(data.islamic_symbols || '[]').join(' • ') || 'None identified'}
            </div>
          </div>
          
          <div class="notes">
            <strong>Scholarly Notes:</strong><br>
            ${data.islamic_notes}
          </div>
        </div>

        <div class="section-container">
          <h2 class="section-title scientific-title">🧠 Scientific & Psychological Lens</h2>
          <div class="content">${data.scientific_summary}</div>
          
          <div class="tag-box">
            <span class="tag-label">Psychological Factors</span>
            <div class="tags">
              ${JSON.parse(data.scientific_factors || '[]').join(' • ') || 'None identified'}
            </div>
          </div>
          
          <div class="notes">
            <strong>Analytical Notes:</strong><br>
            ${data.scientific_notes}
          </div>
        </div>

        <div class="footer">
          © ${new Date().getFullYear()} Ruya - Dual-Perspective Dream Interpretation<br>
          Disclaimer: This report is for informational purposes only. It does not constitute religious rulings or professional advice.
        </div>
      </body>
      </html>
    `;

    // Convert to PDF using wkhtmltopdf
    // We return a stream to be efficient
    const pdfStream = wkhtmltopdf(html, {
      pageSize: 'A4',
      marginTop: '10mm',
      marginBottom: '10mm',
      marginLeft: '10mm',
      marginRight: '10mm',
      encoding: 'UTF-8'
    });

    // In Next.js App Router, we need to convert the stream to a Response
    // Since wkhtmltopdf returns a Node stream, we can use it as a BodyInit
    return new Response(pdfStream as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Ruya_Report_${requestId}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
