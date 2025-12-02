import { TextToSpeechClient } from '@google-cloud/text-to-speech';

const client = new TextToSpeechClient({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}'),
});

export async function generateSpeech(text: string): Promise<Buffer> {
  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: {
      languageCode: 'ro-RO',
      name: 'ro-RO-Standard-A',
      ssmlGender: 'FEMALE',
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: 0.95,
      pitch: 0,
    },
  });

  return response.audioContent as Buffer;
}
