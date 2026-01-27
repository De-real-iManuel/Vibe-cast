'use client'

import { useState, useEffect } from 'react'
import { Calendar, MapPin, Users, Clock, Filter } from 'lucide-react'
import { LiveEvent } from '@/types/database'

export function EventsCalendar() {
  const [events, setEvents] = useState<LiveEvent[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      if (data.success) {
        setEvents(data.events || [])
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'live', label: 'Live Now' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'virtual', label: 'Virtual' }
  ]

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true
    if (filter === 'live') return event.status === 'live'
    if (filter === 'upcoming') return event.status === 'upcoming'
    if (filter === 'virtual') return event.is_virtual
    return true
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500/20 text-red-400'
      case 'upcoming': return 'bg-blue-500/20 text-blue-400'
      case 'ended': return 'bg-gray-500/20 text-gray-400'
      default: return 'bg-purple-500/20 text-purple-400'
    }
  }

  return (
    <div className="p-4 pb-32">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Live Events</h1>
        <p className="text-gray-400">Discover amazing Afrobeats performances</p>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto">
        <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
        {filters.map((filterOption) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              filter === filterOption.id
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-700 rounded mb-4"></div>
              <div className="h-6 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="glass rounded-xl p-6 hover:neon-glow transition-all duration-300 group cursor-pointer">
              {/* Event Status */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                  {event.status === 'live' && '🔴 '}
                  {event.status.toUpperCase()}
                </span>
                {event.status === 'live' && (
                  <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{event.viewer_count.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Artist Avatar */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full pulse-glow"></div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {event.artist?.name}
                  </h3>
                  <p className="text-gray-400">{event.title}</p>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-2 mb-4">
                {event.scheduled_time && (
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.scheduled_time)}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{event.venue}</span>
                </div>
                {event.is_virtual && (
                  <div className="flex items-center space-x-2 text-sm text-purple-400">
                    <span>🌐 Virtual Event</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {event.description && (
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
              )}

              {/* Action Button */}
              <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                event.status === 'live'
                  ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white'
              }`}>
                {event.status === 'live' ? 'Join Live Stream' : 'Set Reminder'}
              </button>

              {/* Gift Stats */}
              {event.total_gifts > 0 && (
                <div className="mt-3 text-center text-sm text-yellow-400">
                  💰 ₦{(event.total_gifts / 100).toLocaleString()} in gifts
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* No Events */}
      {!loading && filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎵</div>
          <h3 className="text-xl font-bold mb-2">No events found</h3>
          <p className="text-gray-400">Check back later for new events</p>
        </div>
      )}
    </div>
  )
}