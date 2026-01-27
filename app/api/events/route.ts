import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: events, error } = await supabase
      .from('live_events')
      .select(`
        *,
        artist:artists(*)
      `)
      .order('scheduled_time', { ascending: true });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      events: events || []
    });
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}