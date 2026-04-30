export interface DreamAnalysis {
  islamic_interpretation: {
    summary: string;
    symbols: string[];
    notes: string;
  };
  scientific_explanation: {
    summary: string;
    psychological_factors: string[];
    notes: string;
  };
}

const SYSTEM_PROMPT = `You are an expert dual-lens dream interpreter. 
Your task is to analyze a user's dream from two distinct perspectives:
1. Islamic scholarly tradition (e.g., Ibn Sirin, Al-Nabulsi).
2. Modern psychological/scientific analysis (e.g., subconscious processing, stress, Jungian).

Strict Constraints:
- Provide dual analysis: Islamic + scientific.
- DO NOT predict the future or make absolute claims.
- DO NOT claim certainty. Use cautious wording like "may represent," "could indicate," or "traditionally symbolizes."
- DO NOT invent fake religious references or fatwas.
- Respond ONLY with a valid JSON object matching the exact structure below, without any markdown formatting.

Output Structure:
{
  "islamic_interpretation": {
    "summary": "...",
    "symbols": ["...", "..."],
    "notes": "..."
  },
  "scientific_explanation": {
    "summary": "...",
    "psychological_factors": ["...", "..."],
    "notes": "..."
  }
}`;

/**
 * Call OpenRouter API
 */
async function callOpenRouter(model: string, dreamText: string): Promise<DreamAnalysis> {
  const apiKey = process.env.OPEN_ROUTER_API_KEY;
  if (!apiKey) throw new Error("OPEN_ROUTER_API_KEY not set");

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
      'X-OpenRouter-Title': process.env.SITE_NAME || 'Ruya',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Analyze the following dream:\n\n"${dreamText}"` }
      ],
      response_format: { type: "json_object" }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  
  if (!content) throw new Error("Empty response from AI provider");

  // Clean markdown formatting if present
  const cleanedContent = content.replace(/```json/g, '').replace(/```/g, '').trim();

  try {
    return JSON.parse(cleanedContent);
  } catch (e) {
    console.error("Failed to parse AI response as JSON:", content);
    throw new Error("Malformed JSON response from AI");
  }
}

/**
 * Main function to process dream with fallback and retry logic
 */
export async function processDream(dreamText: string): Promise<DreamAnalysis> {
  const primaryProvider = process.env.PRIMARY_AI_PROVIDER || 'openrouter';
  const primaryModels = (process.env.PRIMARY_AI_MODELS || '').split(',').map(m => m.trim()).filter(m => m);
  
  let lastError: Error | null = null;
  let attempts = 0;
  const maxTotalAttempts = 3;

  // Try primary provider models
  for (const model of primaryModels) {
    if (attempts >= maxTotalAttempts) break;

    try {
      attempts++;
      console.log(`[AI] Attempt ${attempts} using ${primaryProvider} (${model})...`);
      
      if (primaryProvider === 'openrouter') {
        return await callOpenRouter(model, dreamText);
      }
      
      // Future providers can be added here (e.g., if (primaryProvider === 'openai') ...)
      
    } catch (err: any) {
      console.warn(`[AI] Attempt ${attempts} failed: ${err.message}`);
      lastError = err;
    }
  }

  // If all attempts failed or no config, return mock/fallback to keep app working
  console.error("[AI] All attempts failed. Returning fallback data.", lastError?.message);
  
  return {
    islamic_interpretation: {
      summary: "We are currently experiencing high demand. Traditionally, this dream might reflect your inner spiritual state and current life transitions.",
      symbols: ["Dream Reflection"],
      notes: "Please try again later for a more detailed scholarly analysis."
    },
    scientific_explanation: {
      summary: "The system is temporarily using a simplified analysis. Dreams often serve as a mechanism for emotional regulation and memory consolidation.",
      psychological_factors: ["Emotional processing", "Memory"],
      notes: "This analysis is limited due to high system load."
    }
  };
}
