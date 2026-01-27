import { NextRequest, NextResponse } from 'next/server';
import { moderateChatMessage } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { message, user_id, event_id } = await request.json();

    // Moderate with Gemini
    const moderation = await moderateChatMessage(message);

    if (moderation.allowed) {
      // Save approved message to database
      const { data: chatMessage, error } = await supabase
        .from('chat_messages')
        .insert({
          event_id,
          user_id,
          message,
          moderation_status: moderation.moderation_status,
          ai_sentiment: moderation.sentiment,
          event_timestamp_seconds: Math.floor(Date.now() / 1000)
        })
        .select()
        .single();

      if (error) throw error;

      return NextResponse.json({
        success: true,
        message: chatMessage,
        moderation
      });
    } else {
      // Message was flagged/removed
      return NextResponse.json({
        success: false,
        moderation,
        reason: moderation.reason
      });
    }
  } catch (error) {
    console.error('Chat moderation error:', error);
    return NextResponse.json(
      { error: 'Failed to moderate message' },
      { status: 500 }
    );
  }
}