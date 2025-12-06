/**
 * Social sharing utilities for proverbs
 * Uses native Web Share API with fallbacks
 */

import { ProverbClient } from '@/types/proverb';
import { trackEvent } from './analytics';

export interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
}

export interface SocialMediaUrls {
  facebook: string;
  twitter: string;
  whatsapp: string;
  telegram: string;
  email: string;
  linkedin: string;
  reddit: string;
}

/**
 * Check if Web Share API is available
 */
export function canShare(): boolean {
  return typeof navigator !== 'undefined' && 'share' in navigator;
}

/**
 * Share proverb using native share dialog
 * Falls back to clipboard copy if Web Share API not available
 */
export async function shareProverb(proverb: ProverbClient): Promise<boolean> {
  const shareData: ShareOptions = {
    title: `Proverb românesc: ${proverb.text.substring(0, 50)}${proverb.text.length > 50 ? '...' : ''}`,
    text: `"${proverb.text}"\n\n${proverb.meaning}`,
    url: `${window.location.origin}/proverb/${proverb.id}`
  };

  try {
    if (canShare()) {
      await navigator.share(shareData);
      
      // Track share event
      await trackEvent({
        proverbId: proverb.id,
        eventType: 'share',
        metadata: { method: 'native' }
      });
      
      return true;
    } else {
      // Fallback: copy to clipboard
      const shareText = `${shareData.text}\n\nVezi mai multe: ${shareData.url}`;
      await copyToClipboard(shareText);
      
      // Track share event
      await trackEvent({
        proverbId: proverb.id,
        eventType: 'share',
        metadata: { method: 'clipboard' }
      });
      
      return true;
    }
  } catch (error) {
    console.error('Error sharing:', error);
    return false;
  }
}

/**
 * Copy text to clipboard
 * Uses modern Clipboard API with fallback for older browsers
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // Modern Clipboard API
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-999999px';
      textarea.style.top = '-999999px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      return successful;
    }
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
}

/**
 * Copy proverb text to clipboard
 */
export async function copyProverbText(proverb: ProverbClient): Promise<boolean> {
  const text = `"${proverb.text}"\n\n${proverb.meaning}\n\nSursa: ${window.location.origin}/proverb/${proverb.id}`;
  return copyToClipboard(text);
}

/**
 * Generate social media share URLs for a proverb
 */
export function getSocialShareUrls(proverb: ProverbClient): SocialMediaUrls {
  const text = encodeURIComponent(`"${proverb.text}" - Proverb românesc`);
  const url = encodeURIComponent(`${window.location.origin}/proverb/${proverb.id}`);
  const fullText = encodeURIComponent(`"${proverb.text}"\n\n${proverb.meaning}`);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
    twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=proverbe,Romania,intelepciune`,
    whatsapp: `https://wa.me/?text=${text}%20${url}`,
    telegram: `https://t.me/share/url?url=${url}&text=${text}`,
    email: `mailto:?subject=${text}&body=${fullText}%0A%0AVezi%20aici:%20${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    reddit: `https://reddit.com/submit?url=${url}&title=${text}`
  };
}

/**
 * Open share URL in new window
 */
export function openShareWindow(url: string, platform: string): void {
  const width = 600;
  const height = 400;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  window.open(
    url,
    `share-${platform}`,
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
  );
}

/**
 * Share proverb on specific social media platform
 */
export async function shareOnPlatform(
  proverb: ProverbClient,
  platform: keyof SocialMediaUrls
): Promise<void> {
  const urls = getSocialShareUrls(proverb);
  const url = urls[platform];

  if (platform === 'email') {
    // Email opens in default client
    window.location.href = url;
  } else {
    // Other platforms open in popup
    openShareWindow(url, platform);
  }

  // Track share event
  await trackEvent({
    proverbId: proverb.id,
    eventType: 'share',
    metadata: { platform }
  });
}

/**
 * Generate shareable image URL (for Open Graph)
 */
export function getShareImageUrl(proverb: ProverbClient): string {
  // If proverb has image, use it
  if (proverb.imageUrl) {
    return proverb.imageUrl;
  }

  // Otherwise, generate dynamic OG image URL
  const text = encodeURIComponent(proverb.text);
  return `${window.location.origin}/api/og?text=${text}`;
}

/**
 * Download proverb as image
 * TODO: Implement canvas-based image generation
 */
export async function downloadProverbImage(proverb: ProverbClient): Promise<void> {
  console.log('Download feature coming soon for proverb:', proverb.id);
  
  // Future implementation:
  // 1. Create canvas with proverb text and design
  // 2. Add folk art styling and background
  // 3. Convert to blob and download
  
  // Track attempt
  await trackEvent({
    proverbId: proverb.id,
    eventType: 'share',
    metadata: { method: 'download_image' }
  });
}

/**
 * Generate WhatsApp share link with custom message
 */
export function getWhatsAppShareLink(proverb: ProverbClient, customMessage?: string): string {
  const message = customMessage || `Uite ce proverb interesant am găsit:\n\n"${proverb.text}"\n\n${proverb.meaning}`;
  const url = `${window.location.origin}/proverb/${proverb.id}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}%0A%0A${encodeURIComponent(url)}`;
}

/**
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
