import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: artist, error } = await supabaseServer
      .from('artists')
      .select('*')
      .eq('username', params.id)
      .single();

    if (error) throw error;

    // Get artist's tracks
    const { data: tracks } = await supabaseServer
      .from('tracks')
      .select('*')
      .eq('artist_id', artist.id)
      .order('play_count', { ascending: false });

    // Get artist's upcoming events
    const { data: events } = await supabaseServer
      .from('live_events')
      .select('*')
      .eq('artist_id', artist.id)
      .order('scheduled_time', { ascending: true });

    return NextResponse.json({
      success: true,
      artist,
      tracks: tracks || [],
      events: events || []
    });
  } catch (error) {
    console.error('Failed to fetch artist:', error);
    return NextResponse.json(
      { error: 'Artist not found' },
      { status: 404 }
    );
  }
}