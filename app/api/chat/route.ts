import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { embedText } from '@/lib/gemini';
import { getFallbackResponse } from '@/lib/fallbacks';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

// ── Rate limiter (60 req/min per IP) ────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 60) return false;
  entry.count += 1;
  return true;
}

// ── Language map ─────────────────────────────────────────────────────────────
const LANGUAGE_MAP: Record<string, string> = {
  'en-IN': 'Indian English',
  'hi-IN': 'Hindi (हिन्दी)',
  'bn-IN': 'Bengali (বাংলা)',
  'te-IN': 'Telugu (తెలుగు)',
  'mr-IN': 'Marathi (मराठी)',
  'ta-IN': 'Tamil (தமிழ்)',
  'gu-IN': 'Gujarati (ગુજરાતી)',
  'kn-IN': 'Kannada (ಕನ್ನಡ)',
  'ml-IN': 'Malayalam (മലയാളം)',
  'pa-IN': 'Punjabi (ਪੰਜਾਬੀ)',
  'ur-IN': 'Urdu (اردو)',
};

// ── System Prompt ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are "BIS Saathi" — an intelligent, natural, conversational AI assistant for Bureau of Indian Standards (BIS), Ministry of Consumer Affairs, Food & Public Distribution, Government of India (built for Smart India Hackathon 2026, Problem Statement SIH26107).

PERSONALITY & TONE:
- Speak naturally, warmly, and conversationally — like a knowledgeable, helpful officer at BIS.
- Match the user's language and tone seamlessly:
  * Hinglish (Hindi + English) -> Reply in natural, conversational Hinglish.
  * Hindi (Devanagari) -> Reply in clean, respectful Hindi.
  * English -> Reply in clear, modern, authoritative English.
  * Regional Languages (Marathi, Tamil, Telugu, Bengali, Gujarati, Kannada, etc.) -> Reply in that native language.
- Understand any casual query, slang, typo, or contextual concern (e.g. "bhai mera helmet crack ho gaya", "cooker ki seeti nahi baj rahi", "22k gold me 916 kyu likhte hai", "meri dukaan pe BIS raid ho sakti hai kya").

WHAT YOU COVER (Full Domain Mastery):
1. Explain BIS, Indian Standards (IS Codes), Quality Control Orders (QCOs), certification schemes
2. Guide manufacturers on Scheme-I (ISI Mark via manakonline.in) and Scheme-II (CRS via crsbis.in)
3. Help consumers verify ISI marks (7-10 digit CM/L numbers), CRS marks (8-digit R-numbers), Gold Hallmarks (6-digit laser HUID)
4. Explain specific IS codes: IS 4151 (helmets), IS 2347 (cookers), IS 302 (electricals), IS 1417 (gold), IS 9873 (toys), IS 16333 (chargers), IS 1786 (steel), IS 1489 (cement), IS 14543 (packaged drinking water), IS 15683 (fire extinguishers), IS 16102 (LED lights)
5. Warn about Section 29 BIS Act 2016 penalties (up to ₹5 lakh fine + 2 years imprisonment for non-compliant mandatory goods)
6. Inspect uploaded product photos for mark authenticity (verdict: GENUINE / SUSPICIOUS / COUNTERFEIT)

GENERAL QUESTIONS & CHIT-CHAT (Answer these warmly):
- "hi", "hello", "namaste", "kaise ho", "kya haal hai" -> Respond warmly, introduce yourself, ask how you can assist with product safety or ISI verification.
- "who are you", "tum kaun ho" -> Explain you are BIS Saathi, the official AI Assistant for BIS.
- "bis standard kya hai", "what is bis", "isi mark kya hai", "qco kya hai" -> Provide clear, structured explanations with key facts.

OUT-OF-DOMAIN QUESTIONS (Politely decline only for these):
- Cricket, IPL scores, Python/Java coding, Bollywood movies, recipes, jokes, cryptocurrency, politics, homework math.
- When declining: be warm, use light humor, remind them that you specialize 100% in BIS standards and product safety, and ask what product they would like to verify!

FORMATTING RULES:
- Use clean Markdown tables (| Col 1 | Col 2 |), bold highlights, and clear bullet points for technical specs.
- Always cite exact IS codes and relevant government portals (manakonline.in, crsbis.in).`;

// ── Auto language detection ───────────────────────────────────────────────────
function detectLanguage(text: string, explicitLang?: string): string {
  if (explicitLang && explicitLang !== 'en-IN') return explicitLang;
  if (/[\u0900-\u097F]/.test(text)) return 'hi-IN'; // Hindi / Marathi Devanagari
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta-IN'; // Tamil
  if (/[\u0C00-\u0C7F]/.test(text)) return 'te-IN'; // Telugu
  if (/[\u0980-\u09FF]/.test(text)) return 'bn-IN'; // Bengali
  if (/[\u0A80-\u0AFF]/.test(text)) return 'gu-IN'; // Gujarati
  if (/[\u0C80-\u0CFF]/.test(text)) return 'kn-IN'; // Kannada
  if (/[\u0D00-\u0D7F]/.test(text)) return 'ml-IN'; // Malayalam
  if (/[\u0A00-\u0A7F]/.test(text)) return 'pa-IN'; // Punjabi
  if (/[\u0600-\u06FF]/.test(text)) return 'ur-IN'; // Urdu
  return 'en-IN';
}

// ── Direct Gemini REST Call with Model Cascade ────────────────────────────────
const FALLBACK_KEY = '';

async function callGemini(
  prompt: string,
  systemInstruction: string,
  imageParts?: { mimeType: string; data: string }[]
): Promise<string> {
  const apiKey = (process.env.GEMINI_API_KEY || FALLBACK_KEY).trim();

  const models = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
  ];

  const parts: any[] = [];
  if (imageParts && imageParts.length > 0) {
    for (const img of imageParts) {
      parts.push({ inlineData: { mimeType: img.mimeType, data: img.data } });
    }
  }
  parts.push({ text: prompt });

  const payload: any = {
    contents: [{ role: 'user', parts }],
    systemInstruction: { parts: [{ text: systemInstruction }] },
    generationConfig: {
      temperature: 0.65,
      maxOutputTokens: 2048,
      topP: 0.9,
    },
  };

  let lastErr: any = null;
  for (const model of models) {
    try {
      const controller = new AbortController();
      const tid = setTimeout(() => controller.abort(), 18000); // 18s timeout per model

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );
      clearTimeout(tid);

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(`${model} HTTP ${res.status}: ${errJson?.error?.message || 'status error'}`);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text && text.trim().length > 15) {
        return text.trim();
      }
    } catch (err: any) {
      lastErr = err;
      console.warn(`[BIS Saathi] Model ${model} failed:`, err?.message || err);
    }
  }

  throw lastErr || new Error('All Gemini models failed to respond.');
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiter
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait 60 seconds before trying again.' },
        { status: 429 }
      );
    }

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON request payload' }, { status: 400 });
    }

    const { message, role, history, file, analysisMode, lang } = body;

    if (!message && !file) {
      return NextResponse.json({ error: 'Message or attachment is required.' }, { status: 400 });
    }

    const rawQuery = (message || '').trim();

    // Guard: reject excessively long messages
    if (rawQuery.length > 5000) {
      return NextResponse.json(
        { error: 'Message too long. Please keep your query under 5000 characters.' },
        { status: 400 }
      );
    }

    // Normalize role — only manufacturer | consumer are valid
    const validRole: 'manufacturer' | 'consumer' =
      role === 'manufacturer' ? 'manufacturer' : 'consumer';

    const isDeepAnalysis = analysisMode === 'deep';
    const activeLang = detectLanguage(rawQuery, lang);
    const langName = LANGUAGE_MAP[activeLang] || 'Indian English';
    const isNonEnglish = activeLang !== 'en-IN';

    // ── 2. FAST-PATH: INSTANT RESPONSE FOR COMMON CONCEPTS & GREETINGS (<5ms) ──
    // If no image is attached, check if query matches known greetings, out-of-domain, or core concepts
    if (!file) {
      const fastResult = getFallbackResponse(rawQuery, validRole, activeLang);
      if (fastResult) {
        return NextResponse.json({
          answer: fastResult.answer,
          sources: fastResult.sources,
          isFastPath: true,
        });
      }
    }


    // ── 3. DYNAMIC AI PATH (Gemini Vision or Custom Questions) ──────────────
    try {
      // Vector context (only if query is detailed and we have database configured)
      let context = '';
      const sources: { is_number: string; title: string; category: string }[] = [];

      if (rawQuery.length > 25 && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        try {
          const embedding = await Promise.race([
            embedText(rawQuery),
            new Promise<number[]>((_, r) => setTimeout(() => r([]), 2000)), // 2s max timeout
          ]);

          if (Array.isArray(embedding) && embedding.length === 768) {
            const supabase = createServiceClient();
            const { data: chunks } = await supabase.rpc('match_standard_chunks', {
              query_embedding: embedding,
              match_threshold: 0.15,
              match_count: 4,
            });

            if (chunks && chunks.length > 0) {
              const seen = new Set<string>();
              context = chunks
                .map((c: any) => {
                  if (!seen.has(c.is_number)) {
                    seen.add(c.is_number);
                    sources.push({ is_number: c.is_number, title: c.title, category: c.category });
                  }
                  return `[${c.is_number} — ${c.category}]\n${c.content}`;
                })
                .join('\n\n');
            }
          }
        } catch (vErr) {
          console.warn('[BIS Saathi] Vector lookup skipped:', vErr);
        }
      }

      // Build Prompt
      const roleInstruction = validRole === 'manufacturer'
        ? 'Target Audience: Manufacturer / MSME. Detail in-house lab testing equipment (SIT), Scheme-I vs Scheme-II procedures, portal (manakonline.in / crsbis.in), and audit checklists.'
        : 'Target Audience: Consumer / Citizen. Detail mark authenticity check, CM/L 7-10 digit numbers, R-numbers, gold HUID, consumer rights, and reporting non-ISI goods.';

      const modeInstruction = isDeepAnalysis
        ? '\nMODE: DEEP REGULATORY AUDIT. Include multiple structured Markdown tables: (1) Standard Determination, (2) Mandatory In-House Lab Testing Equipment (SIT) Checklist, (3) Certification Timeline Milestones, (4) Legal Liabilities under Section 29.'
        : '\nMODE: STANDARD ASSISTANCE. Provide a clear, natural response with a summary table where relevant.';

      const langInstruction = isNonEnglish
        ? `\nCRITICAL LANGUAGE DIRECTIVE: The user is speaking ${langName}. Respond ENTIRELY in ${langName} using its authentic native script. Keep only technical standard numbers (like IS 4151:2015, CM/L-7654321, HUID) in English for legal accuracy, but explain all concepts in ${langName}.`
        : '';

      const contextInstruction = context
        ? `\nOFFICIAL BIS DATABASE CONTEXT:\n${context}\n(Integrate these specific standards and cite their IS numbers).`
        : '';

      const historyInstruction = (history || [])
        .slice(-4)
        .map((h: any) => `${h.role === 'user' ? 'User' : 'BIS Saathi'}: ${h.content}`)
        .join('\n');

      const fullPrompt = `${roleInstruction}${modeInstruction}${langInstruction}${contextInstruction}

${historyInstruction ? `PREVIOUS CONVERSATION:\n${historyInstruction}\n\n` : ''}User Query: ${rawQuery || 'Please inspect this uploaded product mark image for BIS authenticity.'}

Authoritative & Friendly Response:`;

      const imageParts = file?.base64 && file?.mimeType
        ? [{ mimeType: file.mimeType, data: file.base64.replace(/^data:[^;]+;base64,/, '') }]
        : undefined;

      const answer = await callGemini(fullPrompt, SYSTEM_PROMPT, imageParts);
      return NextResponse.json({ answer, sources });

    } catch (aiErr: any) {
      console.warn('[BIS Saathi] AI inference failed, executing fallback:', aiErr?.message);

      // Deep fallback
      const fallback = getFallbackResponse(rawQuery, validRole, activeLang);
      if (fallback) {
        return NextResponse.json({
          answer: fallback.answer,
          sources: fallback.sources,
          isFallback: true,
        });
      }

      // Universal helpful BIS response (Never fails)
      const defaultAnswer = isNonEnglish
        ? `### 🏛️ भारतीय मानक ब्यूरो (BIS) — मुख्य उत्पाद मानक मार्गदर्शिका

नमस्ते! मैं **BIS Saathi** हूँ — Bureau of Indian Standards (BIS) का आधिकारिक AI सहायक।

यहाँ मुख्य अनिवार्य गुणवत्ता नियंत्रण आदेशों (QCOs) की सूची दी गई है:

| उत्पाद (Product) | भारतीय मानक (IS Code) | प्रमाणन प्रकार | आधिकारिक पोर्टल |
| :--- | :--- | :--- | :--- |
| **दोपहिया हेलमेट** | **IS 4151:2015** | Scheme-I (ISI मार्क) | [\`manakonline.in\`](https://www.manakonline.in) |
| **घरेलू प्रेशर कुकर** | **IS 2347:2017** | Scheme-I (ISI मार्क) | [\`manakonline.in\`](https://www.manakonline.in) |
| **बिजली के उपकरण** | **IS 302-1:2024** | Scheme-I (ISI मार्क) | [\`manakonline.in\`](https://www.manakonline.in) |
| **मोबाइल चार्जर व LED** | **IS 16333 / 13252** | Scheme-II (CRS) | [\`crsbis.in\`](https://www.crsbis.in) |
| **सोने के आभूषण** | **IS 1417:2016** | 6-अंकों का HUID | [\`manakonline.in\`](https://www.manakonline.in) |
| **सीमेंट व TMT स्टील** | **IS 1489 / IS 1786** | Scheme-I (ISI मार्क) | [\`manakonline.in\`](https://www.manakonline.in) |

⚖️ **कानूनी नियम (BIS Act 2016 की धारा 29):** बिना वैध BIS मार्क के अनिवार्य उत्पाद बेचना गैर-कानूनी है (₹5 लाख तक जुर्माना व 2 वर्ष तक जेल)।

आप किसी भी विशिष्ट उत्पाद का नाम लिखें या उसकी फोटो अपलोड करें — मैं पूरी सहायता करूँगा! 🛡️`
        : `### 🏛️ Bureau of Indian Standards (BIS) — Key Standards Overview

Namaste! I am **BIS Saathi** — the official AI Assistant for the Bureau of Indian Standards (BIS), Government of India.

Here is a quick overview of essential Quality Control Orders (QCOs):

| Product Category | Indian Standard (IS Code) | Scheme Type | Mandatory Mark Format | Official Portal |
| :--- | :--- | :--- | :--- | :--- |
| **Two-Wheeler Helmets** | **IS 4151:2015** | Scheme-I (ISI) | Standard ISI + \`CM/L-XXXXXXXXXX\` | [\`manakonline.in\`](https://www.manakonline.in) |
| **Domestic Pressure Cookers** | **IS 2347:2017** | Scheme-I (ISI) | Standard ISI + \`CM/L-XXXXXXXXXX\` | [\`manakonline.in\`](https://www.manakonline.in) |
| **Household Electricals** | **IS 302-1:2024** | Scheme-I (ISI) | Standard ISI + \`CM/L-XXXXXXXXXX\` | [\`manakonline.in\`](https://www.manakonline.in) |
| **Mobile Chargers & LEDs** | **IS 16333 / IS 13252** | Scheme-II (CRS) | CRS Dual Loop + \`R-XXXXXXXX\` | [\`crsbis.in\`](https://www.crsbis.in) |
| **Gold Jewellery** | **IS 1417:2016** | Hallmarking | BIS Triangle + Karat + \`6-digit HUID\` | [\`manakonline.in\`](https://www.manakonline.in) |
| **Cement & TMT Steel** | **IS 1489 / IS 1786** | Scheme-I (ISI) | Standard ISI + \`CM/L-XXXXXXXXXX\` | [\`manakonline.in\`](https://www.manakonline.in) |

⚖️ **Enforcement under BIS Act, 2016 (Section 29):** Manufacturing or selling uncertified mandatory goods carries penalties up to **₹5,00,000 fine** and **up to 2 years imprisonment**.

Please specify any product or standard you would like to explore, or upload a photo of the product mark for automated verification! 🛡️`;

      return NextResponse.json({
        answer: defaultAnswer,
        sources: [{ is_number: 'BIS Act, 2016', title: 'Quality Control Orders and National Standards Directory', category: 'General' }],
        isFallback: true,
      });
    }

  } catch (rootError) {
    console.error('[BIS Saathi] Root error:', rootError);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
