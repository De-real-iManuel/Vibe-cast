import { CreateEventForm } from '@/components/events/CreateEventForm';

export default function CreateEventPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Event</h1>
            <p className="text-gray-600">Set up your live music event</p>
          </div>
          <CreateEventForm />
        </div>
      </div>
    </div>
  );
}