import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: artist, error } = await supabase
      .from('artists')
      .select('*')
      .eq('username', params.id)
      .single();

    if (error) throw error;

    // Get artist's tracks
    const { data: tracks } = await supabase
      .from('tracks')
      .select('*')
      .eq('artist_id', artist.id)
      .order('play_count', { ascending: false });

    // Get artist's upcoming events
    const { data: events } = await supabase
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