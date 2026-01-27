'use client';

import { useEffect, useState } from 'react';
import { Event } from '@/types/database';
import { ChatBox } from './ChatBox';

interface LiveStreamProps {
  eventId: string;
}

export function LiveStream({ eventId }: LiveStreamProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [viewerCount, setViewerCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}`);
      const data = await response.json();
      setEvent(data.event);
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
      {/* Main Stream Area */}
      <div className="flex-1 flex flex-col">
        {/* Stream Header */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">{event.event_title}</h1>
            <p className="text-gray-300">{event.artist_name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              <span>LIVE</span>
            </div>
            <div className="text-sm">
              {viewerCount} viewers
            </div>
          </div>
        </div>

        {/* Video Player Placeholder */}
        <div className="flex-1 bg-black flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-xl mb-2">Live Stream</p>
            <p className="text-gray-400">Agora.io integration would go here</p>
            <div className="mt-4 text-sm text-gray-500">
              Event ID: {eventId}
            </div>
          </div>
        </div>

        {/* Stream Controls */}
        <div className="bg-gray-800 p-4 flex justify-center space-x-4">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            End Stream
          </button>
        </div>
      </div>

      {/* Chat Sidebar */}
      <div className="w-80 bg-gray-100 border-l">
        <ChatBox eventId={eventId} />
      </div>
    </div>
  );
}