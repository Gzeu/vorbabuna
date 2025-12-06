/**
 * Text-to-Speech service for Romanian proverbs
 * Uses Web Speech API with Romanian language support
 */

export interface TTSOptions {
  lang?: string;
  rate?: number; // 0.1 to 10
  pitch?: number; // 0 to 2
  volume?: number; // 0 to 1
}

export interface TTSState {
  speaking: boolean;
  paused: boolean;
  available: boolean;
}

class TextToSpeechService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    
    const loadVoicesCallback = () => {
      this.voices = this.synth!.getVoices();
    };

    loadVoicesCallback();
    
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoicesCallback;
    }
  }

  private getRomanianVoice(): SpeechSynthesisVoice | null {
    const roVoice = this.voices.find(v => v.lang.startsWith('ro'));
    if (roVoice) return roVoice;
    
    return this.voices[0] || null;
  }

  speak(text: string, options: TTSOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        reject(new Error('TTS not supported'));
        return;
      }

      this.synth.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;
      
      const voice = this.getRomanianVoice();
      if (voice) utterance.voice = voice;

      utterance.lang = options.lang || 'ro-RO';
      utterance.rate = options.rate ?? 0.9;
      utterance.pitch = options.pitch ?? 1;
      utterance.volume = options.volume ?? 1;

      utterance.onend = () => {
        this.currentUtterance = null;
        resolve();
      };
      
      utterance.onerror = (e) => {
        this.currentUtterance = null;
        reject(e);
      };

      this.synth.speak(utterance);
    });
  }

  stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  pause(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  getState(): TTSState {
    return {
      speaking: this.synth?.speaking || false,
      paused: this.synth?.paused || false,
      available: this.synth !== null
    };
  }

  isAvailable(): boolean {
    return this.synth !== null;
  }

  isSpeaking(): boolean {
    return this.synth?.speaking || false;
  }

  isPaused(): boolean {
    return this.synth?.paused || false;
  }

  getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }
}

export const ttsService = new TextToSpeechService();

export async function speakProverb(text: string, options?: TTSOptions): Promise<void> {
  return ttsService.speak(text, options);
}

export function stopSpeaking(): void {
  ttsService.stop();
}

export function pauseSpeaking(): void {
  ttsService.pause();
}

export function resumeSpeaking(): void {
  ttsService.resume();
}

export function isTTSSupported(): boolean {
  return ttsService.isAvailable();
}

export function getTTSState(): TTSState {
  return ttsService.getState();
}
