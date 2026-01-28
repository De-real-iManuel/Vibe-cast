import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: artists, error } = await supabaseServer
      .from('artists')
      .select('*')
      .order('followers_count', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      artists: artists || []
    });
  } catch (error) {
    console.error('Failed to fetch artists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artists' },
      { status: 500 }
    );
  }
}