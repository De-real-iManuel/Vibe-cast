import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const models = {
  flash: genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }),
  pro: genAI.getGenerativeModel({ model: 'gemini-1.5-pro' }),
};

export async function moderateChatMessage(message: string, context?: {
  artistName?: string;
  songTitle?: string;
  previousMessages?: string[];
}): Promise<{
  allowed: boolean;
  sentiment: 'positive' | 'excited' | 'neutral' | 'negative' | 'toxic';
  vibe: 'hyped' | 'chill' | 'emotional' | 'party' | 'toxic';
  reason?: string;
}> {
  const model = models.flash;

  const prompt = `Analyze this chat message from a live Afrobeats/Nigerian music stream:

MESSAGE: "${message}"
${context?.artistName ? `ARTIST: ${context.artistName}` : ''}
${context?.songTitle ? `SONG: ${context.songTitle}` : ''}
${context?.previousMessages ? `CONTEXT: ${context.previousMessages.join(', ')}` : ''}

MODERATION RULES:
1. ALLOW: Music appreciation, Afrobeats culture, artist support, Nigerian slang, excitement, dancing references
2. FLAG: Spam, excessive caps, mild inappropriate content
3. BLOCK: Hate speech, explicit content, harassment, threats

VIBE ANALYSIS:
- hyped: High energy, dancing, fire emojis, caps, "this is fire!"
- party: Party references, dancing, celebration, "turn up"
- emotional: Love, feelings, deep lyrics, "this hits different"
- chill: Relaxed vibes, "smooth", "vibes", laid back
- toxic: Negative, hateful, inappropriate

OUTPUT (JSON only):
{
  "allowed": <true/false>,
  "sentiment": "<positive|excited|neutral|negative|toxic>",
  "vibe": "<hyped|party|emotional|chill|toxic>",
  "reason": "<brief reason if blocked>"
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanText = text.replace(/```json\n?|```\n?/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error('Gemini moderation error:', error);
    return {
      allowed: true,
      sentiment: 'neutral',
      vibe: 'chill',
      reason: 'AI moderation unavailable'
    };
  }
}

export async function analyzeStreamVibe(
  chatMessages: string[],
  artistName: string,
  songTitle: string
): Promise<{
  overallVibe: string;
  energyLevel: number;
  crowdSentiment: string;
  topReactions: string[];
  vibeDescription: string;
}> {
  const model = models.pro;

  const prompt = `Analyze the vibe of this live Afrobeats stream:

ARTIST: ${artistName}
SONG: ${songTitle}
CHAT MESSAGES: ${chatMessages.slice(-20).join(' | ')}

Analyze the crowd energy and vibe. Consider:
- Nigerian/Afrobeats culture and expressions
- Music-specific reactions
- Energy levels and excitement
- Cultural context and slang

OUTPUT (JSON only):
{
  "overallVibe": "<hyped|party|emotional|chill|mixed>",
  "energyLevel": <0-100>,
  "crowdSentiment": "<loving it|going crazy|vibing|mixed|quiet>",
  "topReactions": ["<top 3 reaction types>"],
  "vibeDescription": "<2-3 word description like 'Crowd going wild' or 'Chill vibes flowing'>"
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanText = text.replace(/```json\n?|```\n?/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error('Gemini vibe analysis error:', error);
    return {
      overallVibe: 'chill',
      energyLevel: 50,
      crowdSentiment: 'vibing',
      topReactions: ['🔥', '❤️', '🎵'],
      vibeDescription: 'Good vibes'
    };
  }
}