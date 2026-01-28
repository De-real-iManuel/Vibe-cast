import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: events, error } = await supabaseServer
      .from('live_events')
      .select(`
        *,
        artist:artists(*)
      `)
      .eq('status', 'live')
      .order('viewer_count', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      events: events || []
    });
  } catch (error) {
    console.error('Failed to fetch live events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch live events' },
      { status: 500 }
    );
  }
}