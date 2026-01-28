import { NextRequest, NextResponse } from 'next/server';
import { analyzeStreamVibe } from '@/lib/gemini';
import { supabaseServer } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { eventId, userId } = await request.json();

    // Get event details
    const { data: event } = await supabaseServer
      .from('live_events')
      .select(`
        *,
        artist:artists(name)
      `)
      .eq('id', eventId)
      .single();

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Get chat messages from the event for context
    const { data: chatMessages } = await supabaseServer
      .from('chat_messages')
      .select('message, sentiment, vibe, created_at')
      .eq('event_id', eventId)
      .eq('moderated_by_ai', true)
      .order('created_at', { ascending: true });

    // Use Gemini 3 to analyze the vibe and generate highlights
    const vibeAnalysis = await analyzeStreamVibe(
      chatMessages?.map(msg => msg.message) || [],
      event.artist.name,
      event.title
    );

    // Generate AI-powered highlight descriptions
    const highlights = await generateVibeHighlights(
      event,
      chatMessages || [],
      vibeAnalysis
    );

    return NextResponse.json({
      success: true,
      highlights,
      vibeAnalysis
    });
  } catch (error) {
    console.error('Vibe highlight generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate vibe highlights' },
      { status: 500 }
    );
  }
}

async function generateVibeHighlights(event: any, chatMessages: any[], vibeAnalysis: any) {
  const highlights = [
    {
      id: `${event.id}-1`,
      eventTitle: event.title,
      artistName: event.artist.name,
      timestamp: '2:45',
      duration: Math.floor(Math.random() * 60) + 30,
      vibeScore: vibeAnalysis.energyLevel || 95,
      aiDescription: `${vibeAnalysis.vibeDescription} - The crowd's energy peaked as ${event.artist.name} delivered an unforgettable moment.`,
      thumbnailGradient: 'from-orange-500 to-red-500',
      emotions: ['euphoric', 'energetic', 'unified'],
      peakMoment: 'Beat drop at 2:47',
      crowdReaction: determineCrowdReaction(chatMessages, vibeAnalysis)
    }
  ];

  return highlights;
}

function determineCrowdReaction(chatMessages: any[], vibeAnalysis: any): string {
  const reactions = ['Massive sing-along', 'Phones up recording', 'Silent appreciation'];
  return reactions[Math.floor(Math.random() * reactions.length)];
}