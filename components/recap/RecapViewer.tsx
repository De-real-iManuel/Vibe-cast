'use client';

import { useEffect, useState } from 'react';
import { EventRecap, Event } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Share2 } from 'lucide-react';
import { formatTimestamp } from '@/lib/utils';

interface RecapViewerProps {
  eventId: string;
}

export function RecapViewer({ eventId }: RecapViewerProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [recap, setRecap] = useState<EventRecap | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecap();
  }, [eventId]);

  const fetchRecap = async () => {
    try {
      const [eventRes, recapRes] = await Promise.all([
        fetch(`/api/events/${eventId}`),
        fetch(`/api/events/${eventId}/recap`)
      ]);

      const eventData = await eventRes.json();
      const recapData = await recapRes.json();

      setEvent(eventData.event);
      setRecap(recapData.recap);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!event || !recap) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Recap Not Available</h1>
        <p className="text-gray-600">This event recap is still being processed or doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.event_title}</h1>
        <p className="text-xl text-gray-600 mb-4">{event.artist_name}</p>
        <p className="text-gray-700 leading-relaxed">{recap.summary_text}</p>
      </div>

      {/* Video Player Placeholder */}
      <div className="mb-8">
        <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-4">🎬</div>
            <p className="text-lg">Event Recording</p>
            <p className="text-gray-400">Video player would go here</p>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recap.highlights.map((highlight, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{highlight.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {formatTimestamp(highlight.timestamp)}
                    </span>
                    <Button size="sm" variant="ghost">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">{highlight.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm">
                      <span className="text-gray-500">Energy:</span>
                      <span className="ml-1 font-medium">{highlight.energy_level}/100</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Mood:</span>
                      <span className="ml-1 font-medium capitalize">{highlight.sentiment}</span>
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${highlight.energy_level}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Energy Graph */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Energy Timeline</h2>
        <Card>
          <CardContent className="p-6">
            <div className="h-64 flex items-end space-x-1">
              {recap.energy_graph.map((point, index) => (
                <div
                  key={index}
                  className="flex-1 bg-gradient-to-t from-purple-500 to-blue-500 rounded-t"
                  style={{ height: `${point.energy}%` }}
                  title={`${formatTimestamp(point.time)}: ${point.energy}% energy`}
                />
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Start</span>
              <span>End</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social Sharing */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Share This Recap</h2>
        <div className="flex justify-center space-x-4">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Share2 className="w-4 h-4 mr-2" />
            Twitter
          </Button>
          <Button className="bg-pink-500 hover:bg-pink-600">
            <Share2 className="w-4 h-4 mr-2" />
            Instagram
          </Button>
        </div>
        {recap.social_captions.twitter && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-gray-700">{recap.social_captions.twitter}</p>
          </div>
        )}
      </div>
    </div>
  );
}