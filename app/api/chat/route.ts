import { NextRequest, NextResponse } from 'next/server';
import { moderateChatMessage } from '@/lib/gemini';
import { supabaseServer } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { message, artistName, songTitle, previousMessages } = await request.json();

    const moderation = await moderateChatMessage(message, {
      artistName,
      songTitle,
      previousMessages
    });

    if (moderation.allowed) {
      // Save approved message to database
      const { data: chatMessage, error } = await supabaseServer
        .from('chat_messages')
        .insert({
          event_id: 'temp-event-id', // TODO: Get from request
          user_name: 'Anonymous',
          message,
          sentiment: moderation.sentiment,
          vibe: moderation.vibe,
          moderated_by_ai: true
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