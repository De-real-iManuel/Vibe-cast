'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CreateEventForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    artist_name: '',
    event_title: '',
    event_description: '',
    scheduled_time: '',
    duration_minutes: 120,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        router.push('/events');
      } else {
        alert('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration_minutes' ? parseInt(value) || 120 : value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Artist Name</label>
            <Input
              name="artist_name"
              value={formData.artist_name}
              onChange={handleChange}
              required
              placeholder="Enter artist name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Event Title</label>
            <Input
              name="event_title"
              value={formData.event_title}
              onChange={handleChange}
              required
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="event_description"
              value={formData.event_description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Describe your event"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Scheduled Time</label>
            <Input
              name="scheduled_time"
              type="datetime-local"
              value={formData.scheduled_time}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
            <Input
              name="duration_minutes"
              type="number"
              value={formData.duration_minutes}
              onChange={handleChange}
              min="30"
              max="480"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Create Event'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}