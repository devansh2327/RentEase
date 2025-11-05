import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { beforeImage, afterImage } = await req.json();
    
    if (!beforeImage || !afterImage) {
      return new Response(
        JSON.stringify({ error: 'Both before and after images are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro',
        messages: [
          {
            role: 'system',
            content: `You are an expert damage assessment AI. Analyze the before and after images of a rented item and provide a detailed damage analysis.

Your response must be a valid JSON object with this exact structure:
{
  "condition": "No Damage" | "Minor Damage" | "Major Damage",
  "damagePercentage": <number between 0-100>,
  "summary": "<detailed summary of differences found>",
  "damages": [
    {
      "type": "scratch" | "dent" | "crack" | "missing_part" | "discoloration" | "wear",
      "severity": "minor" | "moderate" | "severe",
      "location": "<where on the item>",
      "description": "<detailed description>"
    }
  ],
  "recommendation": "<action to take>"
}

Analyze carefully for: scratches, dents, cracks, missing parts, discoloration, wear and tear.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze these before and after rental images for damage:'
              },
              {
                type: 'image_url',
                image_url: {
                  url: beforeImage
                }
              },
              {
                type: 'image_url',
                image_url: {
                  url: afterImage
                }
              }
            ]
          }
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'AI analysis failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const analysisText = data.choices?.[0]?.message?.content;
    
    if (!analysisText) {
      throw new Error('No analysis returned from AI');
    }

    // Extract JSON from the response (it might be wrapped in markdown code blocks)
    let analysisJson;
    try {
      // Try to parse directly first
      analysisJson = JSON.parse(analysisText);
    } catch {
      // If that fails, try to extract JSON from markdown code blocks
      const jsonMatch = analysisText.match(/```json\n([\s\S]*?)\n```/) || 
                        analysisText.match(/```\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        analysisJson = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Could not parse AI response as JSON');
      }
    }

    return new Response(
      JSON.stringify({ analysis: analysisJson }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Error in analyze-damage function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
