import { NextRequest, NextResponse } from 'next/server';
import { moderateChatMessage } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { message, artistName, songTitle, previousMessages } = await request.json();

    const moderation = await moderateChatMessage(message, {
      artistName,
      songTitle,
      previousMessages
    });

    return NextResponse.json({
      success: true,
      moderation
    });
  } catch (error) {
    console.error('Chat moderation error:', error);
    return NextResponse.json(
      { error: 'Failed to moderate message' },
      { status: 500 }
    );
  }
}