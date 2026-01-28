import Link from 'next/link';
import { LiveEvent } from '@/types/database';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users } from 'lucide-react';

interface EventCardProps {
  event: LiveEvent;
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.scheduled_time || Date.now());
  const isLive = event.status === 'live';
  const isUpcoming = event.status === 'upcoming';
  const hasEnded = event.status === 'ended';

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isLive ? 'bg-red-100 text-red-800' :
            isUpcoming ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {isLive ? '🔴 LIVE' : isUpcoming ? 'Upcoming' : 'Ended'}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            {event.viewer_count}
          </div>
        </div>
        <CardTitle className="text-lg">{event.title}</CardTitle>
        <p className="text-sm text-gray-600">{event.artist?.name}</p>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {eventDate.toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        {event.description && (
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
            {event.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        {isLive && (
          <Button asChild className="w-full bg-red-600 hover:bg-red-700">
            <Link href={`/live`}>
              Join Live Stream
            </Link>
          </Button>
        )}
        {isUpcoming && (
          <Button asChild variant="outline" className="w-full">
            <Link href={`/events/${event.id}`}>
              View Details
            </Link>
          </Button>
        )}
        {hasEnded && (
          <Button asChild variant="secondary" className="w-full">
            <Link href={`/events/${event.id}`}>
              View Event
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}