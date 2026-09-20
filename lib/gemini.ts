const FALLBACK_KEY = '';

export interface GeminiMessagePart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

export async function generateWithGemini(
  parts: (string | { inlineData: { mimeType: string; data: string } })[],
  systemInstruction?: string
): Promise<string> {
  const apiKey = (process.env.GEMINI_API_KEY || FALLBACK_KEY).trim();
  const modelsToTry = [
    process.env.GEMINI_MODEL || 'gemini-3.6-flash',
    'gemini-3.6-flash',
    'gemini-3.5-flash',
  ];

  // Convert parts to standard Gemini format
  const formattedParts = parts.map((p) => {
    if (typeof p === 'string') return { text: p };
    return p;
  });

  const bodyPayload: any = {
    contents: [
      {
        role: 'user',
        parts: formattedParts,
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  };

  if (systemInstruction) {
    bodyPayload.systemInstruction = {
      parts: [{ text: systemInstruction }],
    };
  }

  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return text;
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`Model ${model} attempt failed:`, err?.message || err);
      // Try next model
    }
  }

  throw lastError || new Error('All Gemini models failed to respond.');
}

export function getGeminiFlash() {
  return {
    generateContent: async (contentParts: any[]) => {
      const text = await generateWithGemini(contentParts);
      return {
        response: {
          text: () => text,
        },
      };
    },
  };
}

export async function embedText(text: string): Promise<number[]> {
  try {
    const apiKey = (process.env.GEMINI_API_KEY || FALLBACK_KEY).trim();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: { parts: [{ text }] },
        outputDimensionality: 768,
      }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.embedding?.values || [];
  } catch (err) {
    return [];
  }
}


