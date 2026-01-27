import { NextRequest, NextResponse } from 'next/server';
import { analyzeStreamVibe } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { chatMessages, artistName, songTitle } = await request.json();

    const vibeAnalysis = await analyzeStreamVibe(chatMessages, artistName, songTitle);

    return NextResponse.json({
      success: true,
      vibe: vibeAnalysis
    });
  } catch (error) {
    console.error('Vibe analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze vibe' },
      { status: 500 }
    );
  }
}