import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: tracks, error } = await supabaseServer
      .from('tracks')
      .select(`
        *,
        artist:artists(name, username, verified)
      `)
      .order('play_count', { ascending: false })
      .limit(10);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      tracks: tracks || []
    });
  } catch (error) {
    console.error('Failed to fetch tracks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tracks' },
      { status: 500 }
    );
  }
}