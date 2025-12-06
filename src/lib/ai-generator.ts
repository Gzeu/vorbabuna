/**
 * AI-Powered Proverb Generator using Pollinations AI
 * Generates authentic Romanian proverbs with meanings
 */

import { generatePollinationsImage, generatePollinationsPrompt } from './pollinations';

export interface GeneratedProverb {
  text: string;
  meaning: string;
  category: string;
  region?: string;
  keywords: string[];
  confidence: number;
  imageUrl?: string;
  imagePrompt?: string;
}

export interface GenerationOptions {
  category?: string;
  region?: string;
  style?: 'traditional' | 'modern' | 'poetic';
  length?: 'short' | 'medium' | 'long';
  count?: number;
  generateImage?: boolean;
}

/**
 * Generate new proverbs using Pollinations AI
 */
export async function generateProverbs(
  options: GenerationOptions = {}
): Promise<GeneratedProverb[]> {
  const {
    category = 'Intelepciune',
    region,
    style = 'traditional',
    length = 'medium',
    count = 1,
    generateImage = false
  } = options;

  try {
    const prompt = buildGenerationPrompt(category, region, style, length, count);
    const proverbs = await generateWithPollinations(prompt, count);

    // Generate images if requested
    if (generateImage) {
      for (const proverb of proverbs) {
        try {
          const imagePrompt = generatePollinationsPrompt(
            proverb.text,
            proverb.meaning,
            category,
            region
          );
          const imageUrl = generatePollinationsImage(imagePrompt);
          proverb.imageUrl = imageUrl;
          proverb.imagePrompt = imagePrompt;
        } catch (error) {
          console.error('Error generating image:', error);
        }
      }
    }

    return proverbs;
  } catch (error) {
    console.error('Error generating proverbs:', error);
    return generateWithPatterns(category, region, count);
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
Ești un expert în înțelepciunea populară românească. Generează ${count} proverbe românești autentice despre "${category}"${regionContext}.

Caracteristici:
- Stil: ${style}
- Lungime: ${lengthGuide}
- Limbaj: Românesc autentic
- Structură: Clasică proverbială

Pentru fiecare proverb, returnează în format JSON:
{
  "text": "textul proverbului",
  "meaning": "explicația detaliată",
  "keywords": ["cuvânt1", "cuvânt2", "cuvânt3"]
}

Răspunde DOAR cu array-ul JSON, fără text adițional.
  `.trim();
}

/**
 * Generate using Pollinations AI
 */
async function generateWithPollinations(
  prompt: string,
  count: number
): Promise<GeneratedProverb[]> {
  try {
    // Use Pollinations text API with turbo model for fast generation
    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'Ești un expert în proverbe și înțelepciune populară românească. Răspunzi DOAR în JSON valid.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model: 'openai', // Can be: openai, mistral, turbo
        jsonMode: true,
        seed: Math.floor(Math.random() * 1000000)
      })
    });

    const text = await response.text();
    return parseGeneratedProverbs(text, count);
  } catch (error) {
    console.error('Pollinations API error:', error);
    throw error;
  }
}

/**
 * Parse AI-generated proverbs from text
 */
function parseGeneratedProverbs(text: string, count: number): GeneratedProverb[] {
  try {
    // Try to parse JSON response
    let parsed;
    
    // Remove markdown code blocks if present
    const cleanText = text.replace(/```json\n?|```\n?/g, '').trim();
    
    // Try direct parse
    try {
      parsed = JSON.parse(cleanText);
    } catch {
      // Try to extract JSON array
      const jsonMatch = cleanText.match(/\[.*\]/s);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found');
      }
    }

    // Ensure it's an array
    const proverbsArray = Array.isArray(parsed) ? parsed : [parsed];

    return proverbsArray.slice(0, count).map(item => ({
      text: item.text || item.proverb || '',
      meaning: item.meaning || item.explanation || '',
      category: item.category || 'Intelepciune',
      keywords: item.keywords || [],
      confidence: 0.85
    }));
  } catch (error) {
    console.error('Error parsing proverbs:', error);
    return [];
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
      ...patterns[i],
      category,
      region,
      confidence: 0.7
    });
  }

  return results;
}

/**
 * Get proverb patterns by category
 */
function getProverbPatterns(category: string) {
  const patterns: Record<string, any[]> = {
    'Intelepciune': [
      {
        text: 'Cine învață mereu, nu îmbătrânește niciodată',
        meaning: 'Învățătura continuă menține mintea tânără și activă',
        keywords: ['învățare', 'tinerețe', 'cunoștință']
      },
      {
        text: 'Mai bine singur decât prost însoțit',
        meaning: 'E preferabil să fii singur decât să ai companie rea',
        keywords: ['singurătate', 'prietenie', 'alegeri']
      }
    ],
    'Familie': [
      {
        text: 'Casa fără copii e ca grădina fără flori',
        meaning: 'Copiii aduc bucurie și viață în casă',
        keywords: ['familie', 'copii', 'bucurie']
      }
    ],
    'Munca': [
      {
        text: 'Munca cinstită nu îmbogățește, dar cinstea nu sărăcește',
        meaning: 'Onestitatea și munca sunt mai importante decât bogăția',
        keywords: ['muncă', 'cinste', 'valori']
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

/**
 * Generate proverb with Pollinations (simplified API)
 */
export async function generateSimpleProverb(category: string): Promise<string> {
  try {
    const response = await fetch(
      `https://text.pollinations.ai/Generează un proverb românesc despre ${category}`,
      { method: 'GET' }
    );
    return await response.text();
  } catch (error) {
    console.error('Error generating simple proverb:', error);
    return 'Cine seamănă vânt, culege furtună';
  }
}
