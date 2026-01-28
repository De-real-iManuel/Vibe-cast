'use client';

import { useEffect, useState } from 'react';
import { EventRecap, LiveEvent } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Share2 } from 'lucide-react';
import { formatTimestamp } from '@/lib/utils';

interface RecapViewerProps {
  eventId: string;
}

export function RecapViewer({ eventId }: RecapViewerProps) {
  const [event, setEvent] = useState<LiveEvent | null>(null);
  const [recap, setRecap] = useState<EventRecap | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecap();
  }, [eventId]);

  const fetchRecap = async () => {
    try {
      // Mock data for now
      setEvent({
        id: eventId,
        artist_id: '1',
        title: 'African Giant Live',
        description: 'Amazing performance',
        status: 'ended',
        viewer_count: 12547,
        total_gifts: 850000,
        is_virtual: true,
        created_at: new Date().toISOString(),
        artist: {
          id: '1',
          name: 'Burna Boy',
          username: 'burnaboy',
          email: 'burna@vibestream.com',
          verified: true,
          followers_count: 2100000,
          total_earnings: 0,
          is_live: false,
          live_viewers: 0,
          created_at: new Date().toISOString()
        }
      });
      
      setRecap({
        id: '1',
        event_id: eventId,
        summary_text: 'An incredible performance that had the crowd on their feet from start to finish.',
        highlights: [
          {
            timestamp: 145,
            duration: 30,
            title: 'Crowd erupts during Last Last',
            description: 'The crowd went wild when the beat dropped',
            energy_level: 95,
            sentiment: 'excited'
          }
        ],
        peak_moments: [],
        sentiment_analysis: { overall: 'positive', timeline: [] },
        energy_graph: [{ time: 0, energy: 60 }, { time: 60, energy: 95 }],
        social_captions: {
          twitter: '🔥 Epic night with Burna Boy!',
          instagram: 'Last night was UNREAL ✨'
        },
        generated_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to fetch recap:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!event || !recap) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Recap Not Available</h1>
        <p className="text-gray-600">This event recap is still being processed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
        <p className="text-xl text-gray-400 mb-4">{event.artist?.name}</p>
        <p className="text-gray-300 leading-relaxed">{recap.summary_text}</p>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-6">Share This Recap</h2>
        <div className="flex justify-center space-x-4">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Share2 className="w-4 h-4 mr-2" />
            Twitter
          </Button>
        </div>
      </div>
    </div>
  );
}