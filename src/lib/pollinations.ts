/**
 * Pollinations.ai Image Generation
 * Free API - no key required
 */

export interface ImageOptions {
  width?: number;
  height?: number;
  seed?: number;
  model?: 'flux' | 'flux-realism' | 'flux-anime' | 'flux-3d' | 'turbo';
  nologo?: boolean;
  enhance?: boolean;
}

export function generateImageUrl(prompt: string, options: ImageOptions = {}): string {
  const {
    width = 800,
    height = 600,
    seed,
    model = 'flux',
    nologo = true,
    enhance = false,
  } = options;

  const params = new URLSearchParams();
  params.append('width', width.toString());
  params.append('height', height.toString());
  if (seed !== undefined) params.append('seed', seed.toString());
  params.append('model', model);
  if (nologo) params.append('nologo', 'true');
  if (enhance) params.append('enhance', 'true');

  const encodedPrompt = encodeURIComponent(prompt);
  return `https://pollinations.ai/p/${encodedPrompt}?${params.toString()}`;
}

export function getFolkArtPrompt(proverbText: string, category: string): string {
  const stylePrompts = {
    familie: 'traditional Romanian family gathering, warm colors, folk art style',
    filozofie: 'philosophical concept, Romanian folk symbols, wisdom illustration',
    muncă: 'hardworking scene, traditional Romanian village, rustic atmosphere',
    natură: 'Romanian countryside landscape, natural beauty, pastoral scene',
    default: 'Romanian folk art illustration, traditional motifs, vibrant colors',
  };

  const baseStyle = stylePrompts[category as keyof typeof stylePrompts] || stylePrompts.default;
  return `${proverbText}, ${baseStyle}, detailed illustration, warm lighting, cultural heritage`;
}
