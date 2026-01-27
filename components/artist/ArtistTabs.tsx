'use client'

import { useState } from 'react'
import { Play, Calendar, MapPin, Gift } from 'lucide-react'

const tracks = [
  { id: 1, title: "Last Last", plays: "2.1M", duration: "3:45", cover: "bg-gradient-to-br from-orange-500 to-red-500" },
  { id: 2, title: "Ye", plays: "5.8M", duration: "2:58", cover: "bg-gradient-to-br from-blue-500 to-purple-500" },
  { id: 3, title: "On The Low", plays: "3.2M", duration: "3:12", cover: "bg-gradient-to-br from-green-500 to-blue-500" },
  { id: 4, title: "Anybody", plays: "1.9M", duration: "3:33", cover: "bg-gradient-to-br from-pink-500 to-purple-500" }
]

const events = [
  { id: 1, title: "African Giant World Tour", date: "Dec 15, 2024", venue: "Lagos, Nigeria", status: "upcoming" },
  { id: 2, title: "Love Damini Live", date: "Dec 22, 2024", venue: "Virtual Concert", status: "upcoming" },
  { id: 3, title: "Afrobeats Festival", date: "Jan 5, 2025", venue: "London, UK", status: "upcoming" }
]

interface ArtistTabsProps {
  artistId: string;
}

export function ArtistTabs({ artistId }: ArtistTabsProps) {
  const [activeTab, setActiveTab] = useState('tracks')

  const tabs = [
    { id: 'tracks', label: 'Tracks', count: tracks.length },
    { id: 'events', label: 'Events', count: events.length },
    { id: 'about', label: 'About', count: null }
  ]

  return (
    <div className="px-4 pb-32">
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 glass rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
            {tab.count && (
              <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'tracks' && (
        <div className="space-y-3">
          {tracks.map((track, index) => (
            <div key={track.id} className="glass rounded-xl p-4 hover:neon-glow transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="text-lg font-bold text-gray-500 w-6">
                  {index + 1}
                </div>

                <div className="relative">
                  <div className={`w-12 h-12 ${track.cover} rounded-lg`}></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{track.title}</h3>
                  <p className="text-sm text-gray-400">{track.plays} plays</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-400">{track.duration}</p>
                </div>

                <button className="p-2 text-yellow-400 hover:text-yellow-300 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Gift className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="glass rounded-xl p-4 hover:neon-glow transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">{event.title}</h3>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                  {event.status}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{event.venue}</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-2 rounded-lg font-medium transition-all duration-300">
                Set Reminder
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'about' && (
        <div className="space-y-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">About Burna Boy</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Damini Ebunoluwa Ogulu, known professionally as Burna Boy, is a Nigerian singer, songwriter, rapper, and dancer. He rose to prominence in 2012 after releasing "Like to Party", the lead single from his debut studio album L.I.F.E.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Burna Boy's music is a fusion of Afrobeats, reggae, American rap, and R&B. He has won numerous awards including a Grammy Award for Best Global Music Album.
            </p>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">1</div>
                <div className="text-sm text-gray-400">Grammy Award</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">5</div>
                <div className="text-sm text-gray-400">Studio Albums</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">2.1M</div>
                <div className="text-sm text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">50+</div>
                <div className="text-sm text-gray-400">Countries Toured</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}