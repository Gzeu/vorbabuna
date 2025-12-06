/**
 * React hook for social sharing functionality
 */

import { useState } from 'react';
import { ProverbClient } from '@/types/proverb';
import {
  shareProverb,
  shareOnPlatform,
  copyProverbText,
  canShare,
  getSocialShareUrls
} from '@/lib/sharing';

export function useSharing() {
  const [isSharing, setIsSharing] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  const share = async (proverb: ProverbClient): Promise<boolean> => {
    setIsSharing(true);
    setShareError(null);

    try {
      const success = await shareProverb(proverb);
      if (!success) {
        setShareError('Failed to share proverb');
      }
      return success;
    } catch (error) {
      setShareError(String(error));
      return false;
    } finally {
      setIsSharing(false);
    }
  };

  const shareOn = async (
    proverb: ProverbClient,
    platform: 'facebook' | 'twitter' | 'whatsapp' | 'telegram' | 'email' | 'linkedin' | 'reddit'
  ) => {
    setIsSharing(true);
    setShareError(null);

    try {
      await shareOnPlatform(proverb, platform);
      return true;
    } catch (error) {
      setShareError(String(error));
      return false;
    } finally {
      setIsSharing(false);
    }
  };

  const copyText = async (proverb: ProverbClient): Promise<boolean> => {
    setIsSharing(true);
    setShareError(null);

    try {
      const success = await copyProverbText(proverb);
      if (!success) {
        setShareError('Failed to copy text');
      }
      return success;
    } catch (error) {
      setShareError(String(error));
      return false;
    } finally {
      setIsSharing(false);
    }
  };

  return {
    share,
    shareOn,
    copyText,
    isSharing,
    shareError,
    canShare: canShare(),
    getShareUrls: getSocialShareUrls
  };
}
