'use client';

import { useEffect, useState } from 'react';
import { LiveEvent } from '@/types/database';
import { ChatBox } from './ChatBox';

interface LiveStreamProps {
  eventId: string;
}

export function LiveStream({ eventId }: LiveStreamProps) {
  const [event, setEvent] = useState<LiveEvent | null>(null);
  const [viewerCount, setViewerCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      // Mock data for now
      setEvent({
        id: eventId,
        artist_id: '1',
        title: 'African Giant Live',
        description: 'Live performance',
        status: 'live',
        viewer_count: 12547,
        total_gifts: 0,
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
          is_live: true,
          live_viewers: 12547,
          created_at: new Date().toISOString()
        }
      });
      setViewerCount(12547);
    } catch (error) {
      console.error('Failed to fetch event:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-xl">Loading stream...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-xl">Event not found</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">{event.title}</h1>
            <p className="text-gray-300">{event.artist?.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              <span>LIVE</span>
            </div>
            <div className="text-sm">
              {viewerCount.toLocaleString()} viewers
            </div>
          </div>
        </div>

        <div className="flex-1 bg-black flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-xl mb-2">Live Stream</p>
            <p className="text-gray-400">Streaming in progress...</p>
          </div>
        </div>

        <div className="bg-gray-800 p-4 flex justify-center space-x-4">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            End Stream
          </button>
        </div>
      </div>

      <div className="w-80 bg-gray-100 border-l">
        <ChatBox />
      </div>
    </div>
  );
}