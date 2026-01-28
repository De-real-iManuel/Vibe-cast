'use client'

import { useState } from 'react'
import { Heart, Clock, Calendar, Download, Play, Gift } from 'lucide-react'

export function LibraryTabs() {
  const [activeTab, setActiveTab] = useState('liked')

  const tabs = [
    { id: 'liked', label: 'Liked Songs', icon: Heart, count: 47 },
    { id: 'recent', label: 'Recently Played', icon: Clock, count: 23 },
    { id: 'events', label: 'My Events', icon: Calendar, count: 8 },
    { id: 'downloads', label: 'Downloads', icon: Download, count: 12 }
  ]

  const likedSongs = [
    { id: 1, title: 'Last Last', artist: 'Burna Boy', duration: '3:45', gradient: 'from-orange-500 to-red-500' },
    { id: 2, title: 'Calm Down', artist: 'Rema', duration: '3:59', gradient: 'from-blue-500 to-purple-500' },
    { id: 3, title: 'Free Mind', artist: 'Tems', duration: '3:12', gradient: 'from-pink-500 to-purple-500' }
  ]

  const recentEvents = [
    { 
      id: 1, 
      title: 'African Giant Live', 
      artist: 'Burna Boy', 
      date: '2 days ago', 
      status: 'watched',
      vibeScore: 98,
      highlights: 5
    },
    { 
      id: 2, 
      title: 'For Broken Ears Session', 
      artist: 'Tems', 
      date: '1 week ago', 
      status: 'attended',
      vibeScore: 94,
      highlights: 3
    }
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-white/5 rounded-xl p-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'liked' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Your Liked Songs</h3>
            <button className="text-sm text-purple-400 hover:text-purple-300">
              Play All
            </button>
          </div>
          
          {likedSongs.map((song, index) => (
            <div key={song.id} className="glass rounded-xl p-4 hover:neon-glow transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="text-lg font-bold text-gray-500 w-6">
                  {index + 1}
                </div>
                
                <div className={`w-12 h-12 bg-gradient-to-br ${song.gradient} rounded-lg relative`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{song.title}</h4>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                </div>
                
                <div className="text-sm text-gray-500">{song.duration}</div>
                
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-red-400 hover:text-red-300 rounded-full hover:bg-white/10">
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                  <button className="p-2 text-yellow-400 hover:text-yellow-300 rounded-full hover:bg-white/10">
                    <Gift className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Your Events</h3>
            <button className="text-sm text-purple-400 hover:text-purple-300">
              View Calendar
            </button>
          </div>
          
          {recentEvents.map((event) => (
            <div key={event.id} className="glass rounded-xl p-4 hover:neon-glow transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-white">{event.title}</h4>
                  <p className="text-sm text-gray-400">{event.artist} • {event.date}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    event.status === 'attended' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">🔥</span>
                    <span className="text-gray-400">Vibe Score:</span>
                    <span className="text-white font-medium">{event.vibeScore}/100</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <span className="text-purple-400">✨</span>
                    <span className="text-gray-400">{event.highlights} AI Highlights</span>
                  </div>
                </div>
                
                <button className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  View Replay
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(activeTab === 'recent' || activeTab === 'downloads') && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">
            {activeTab === 'recent' ? '🎵' : '📥'}
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">
            {activeTab === 'recent' ? 'No Recent Activity' : 'No Downloads Yet'}
          </h3>
          <p className="text-gray-400">
            {activeTab === 'recent' 
              ? 'Start listening to see your recent tracks here' 
              : 'Download tracks for offline listening'
            }
          </p>
        </div>
      )}
    </div>
  )
}