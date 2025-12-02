import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateProverbImage(proverb: string): Promise<string> {
  const prompt = `Create a beautiful, artistic illustration for this Romanian proverb: "${proverb}". 
  Style: Traditional Romanian folk art meets modern minimalism. 
  Include symbolic elements that represent the proverb's meaning. 
  Warm colors, cultural motifs, and elegant composition.`;

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1024x1024',
    quality: 'standard',
  });

  return response.data[0].url || '';
}

export async function generateProverbExplanation(proverb: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'Tu ești un expert în proverbe și înțelepciune populară românească. Explică sensul proverbelor într-un mod accesibil și captivant.',
      },
      {
        role: 'user',
        content: `Explică sensul acestui proverb românesc: "${proverb}"`,
      },
    ],
    max_tokens: 200,
    temperature: 0.7,
  });

  return completion.choices[0].message.content || '';
}
