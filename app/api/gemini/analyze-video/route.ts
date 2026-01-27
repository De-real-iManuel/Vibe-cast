import { NextRequest, NextResponse } from 'next/server';
import { analyzeEventVideo } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { video_url, event_id } = await request.json();

    // Get chat context for the event
    const { data: chatMessages } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('event_id', event_id)
      .eq('moderation_status', 'approved')
      .order('timestamp', { ascending: true });

    // Analyze video with Gemini
    const analysis = await analyzeEventVideo(video_url, event_id, chatMessages || []);

    // Save recap to database
    const { data: recap, error } = await supabase
      .from('event_recaps')
      .insert({
        event_id,
        summary_text: analysis.summary,
        highlights: analysis.highlights,
        peak_moments: analysis.peak_moments,
        sentiment_analysis: analysis.sentiment_analysis,
        energy_graph: analysis.energy_graph,
        social_captions: {
          twitter: `🔥 Epic night! ${analysis.highlights[0]?.title || 'Amazing performance'} - Check out the highlights!`,
          instagram: `Last night was UNREAL ✨ ${analysis.summary.slice(0, 100)}...`
        }
      })
      .select()
      .single();

    if (error) throw error;

    // Update event status
    await supabase
      .from('events')
      .update({ status: 'ended' })
      .eq('id', event_id);

    return NextResponse.json({
      success: true,
      analysis,
      recap
    });
  } catch (error) {
    console.error('Video analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze video' },
      { status: 500 }
    );
  }
}