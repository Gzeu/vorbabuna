/**
 * AI-Powered Proverb Generator using Gemini API
 * Generates authentic Romanian proverbs with meanings
 */

export interface GeneratedProverb {
  text: string;
  meaning: string;
  category: string;
  region?: string;
  keywords: string[];
  confidence: number;
}

export interface GenerationOptions {
  category?: string;
  region?: string;
  style?: 'traditional' | 'modern' | 'poetic';
  length?: 'short' | 'medium' | 'long';
  count?: number;
}

/**
 * Generate new proverbs using AI
 */
export async function generateProverbs(
  options: GenerationOptions = {}
): Promise<GeneratedProverb[]> {
  const {
    category = 'Intelepciune',
    region,
    style = 'traditional',
    length = 'medium',
    count = 1
  } = options;

  const prompt = buildGenerationPrompt(category, region, style, length, count);

  try {
    // Use Gemini API or fallback to pattern-based generation
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (apiKey) {
      return await generateWithGemini(prompt, apiKey, count);
    } else {
      // Fallback to pattern-based generation
      return generateWithPatterns(category, region, count);
    }
  } catch (error) {
    console.error('Error generating proverbs:', error);
    return [];
  }
}

/**
 * Build prompt for AI generation
 */
function buildGenerationPrompt(
  category: string,
  region: string | undefined,
  style: string,
  length: string,
  count: number
): string {
  const regionContext = region ? ` din regiunea ${region}` : '';
  const lengthGuide = {
    short: '5-10 cuvinte',
    medium: '10-20 cuvinte',
    long: '20-30 cuvinte'
  }[length];

  return `
Generează ${count} proverbe românești autentice despre categoria "${category}"${regionContext}.

Stil: ${style}
Lungime: ${lengthGuide}

Fiecare proverb trebuie să fie:
- Autentic și să sune natural în română
- Să conțină înțelepciune poplară
- Să fie inedit (să nu existe deja)
- Să respecte structura proverbelor românești

Pentru fiecare proverb, furnizează:
1. Textul proverbului
2. Semnificația/Explicația
3. 3-5 cuvinte cheie

Răspunde în format JSON.
  `.trim();
}

/**
 * Generate using Gemini AI
 */
async function generateWithGemini(
  prompt: string,
  apiKey: string,
  count: number
): Promise<GeneratedProverb[]> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 1024
          }
        })
      }
    );

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    
    // Parse JSON response
    return parseGeneratedProverbs(text, count);
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

/**
 * Pattern-based generation fallback
 */
function generateWithPatterns(
  category: string,
  region: string | undefined,
  count: number
): GeneratedProverb[] {
  const patterns = getProverbPatterns(category);
  const results: GeneratedProverb[] = [];

  for (let i = 0; i < count && i < patterns.length; i++) {
    results.push({
      text: patterns[i].text,
      meaning: patterns[i].meaning,
      category,
      region,
      keywords: patterns[i].keywords,
      confidence: 0.7
    });
  }

  return results;
}

/**
 * Parse AI-generated proverbs from text
 */
function parseGeneratedProverbs(text: string, count: number): GeneratedProverb[] {
  try {
    const jsonMatch = text.match(/\[.*\]/s);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed.slice(0, count);
    }
  } catch {}

  return [];
}

/**
 * Get proverb patterns by category
 */
function getProverbPatterns(category: string) {
  const patterns: Record<string, any[]> = {
    'Intelepciune': [
      {
        text: 'Cine învață mereu, nu îmbtrânește niciodată',
        meaning: 'Învățătura continuă menține mintea tânără',
        keywords: ['învățare', 'tinerețe', 'cunoștință']
      }
    ],
    'Familie': [
      {
        text: 'Casa fără copii e ca grădina fără flori',
        meaning: 'Copiii aduc bucurie și viață în casă',
        keywords: ['familie', 'copii', 'bucurie']
      }
    ]
  };

  return patterns[category] || patterns['Intelepciune'];
}

/**
 * Validate generated proverb
 */
export function validateProverb(proverb: GeneratedProverb): boolean {
  return (
    proverb.text.length >= 10 &&
    proverb.text.length <= 200 &&
    proverb.meaning.length >= 20 &&
    proverb.keywords.length >= 2 &&
    proverb.confidence >= 0.5
  );
}
