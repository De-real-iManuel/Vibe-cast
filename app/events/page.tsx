import { EventsCalendar } from '@/components/events/EventsCalendar'
import { BottomNav } from '@/components/layout/BottomNav'

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <EventsCalendar />
      <BottomNav />
    </div>
  )
}