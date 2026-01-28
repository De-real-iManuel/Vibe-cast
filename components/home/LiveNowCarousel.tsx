'use client'

import { useEffect, useState } from 'react'
import { Play, Users, Gift, Flame } from 'lucide-react'
import { LiveEvent } from '@/types/database'

export function LiveNowCarousel() {
  const [liveStreams, setLiveStreams] = useState<LiveEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLiveStreams()
    const interval = setInterval(fetchLiveStreams, 30000) // Update every 30s
    return () => clearInterval(interval)
  }, [])

  const fetchLiveStreams = async () => {
    try {
      const response = await fetch('/api/live')
      const data = await response.json()
      if (data.success) {
        setLiveStreams(data.events)
      }
    } catch (error) {
      console.error('Failed to fetch live streams:', error)
    } finally {
      setLoading(false)
    }
  }

  const getAvatarGradient = (index: number) => {
    const gradients = [
      'from-orange-400 to-red-500',
      'from-purple-400 to-blue-500', 
      'from-pink-400 to-purple-500',
      'from-yellow-400 to-orange-500',
      'from-green-400 to-blue-500'
    ]
    return gradients[index % gradients.length]
  }

  const getVibeEmoji = (index: number) => {
    const emojis = ['🔥', '⚡', '✨', '🎵', '💫']
    return emojis[index % emojis.length]
  }

  if (loading) {
    return (
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-72 glass rounded-xl p-4 animate-pulse">
            <div className="h-4 bg-gray-700 rounded mb-3"></div>
            <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-2/3 mx-auto"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
      {liveStreams.map((stream, index) => (
        <div key={stream.id} className="flex-shrink-0 w-72">
          <div className="glass rounded-xl p-4 hover:neon-glow transition-all duration-300 group cursor-pointer relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 transform rotate-12 scale-150"></div>
            </div>
            
            {/* Live Indicator & Stats */}
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-red-500/30">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-red-400">LIVE</span>
                </div>
                <span className="text-lg animate-bounce">{getVibeEmoji(index)}</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{stream.viewer_count.toLocaleString()}</span>
                </div>
                {stream.total_gifts > 0 && (
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Gift className="w-3 h-3" />
                    <span>₦{(stream.total_gifts / 100).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Artist Avatar with Glow Effect */}
            <div className="relative mb-4">
              <div className={`w-20 h-20 bg-gradient-to-br ${getAvatarGradient(index)} rounded-full mx-auto pulse-glow relative`}>
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />
              </div>
              
              {/* Floating Reaction */}
              <div className="absolute -top-2 -right-2 animate-bounce">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                  <Flame className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Stream Info */}
            <div className="relative z-10 text-center space-y-3">
              <div>
                <h3 className="font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
                  {stream.artist?.name}
                </h3>
                <p className="text-sm text-gray-300 truncate mt-1">{stream.title}</p>
              </div>
              
              {/* Genre Tag */}
              <div className="flex justify-center">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                  Afrobeats
                </span>
              </div>
              
              {/* Vibe Meter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Vibe Level</span>
                  <span>🔥 High</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full w-4/5 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Join Button */}
            <button className="relative z-10 w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-3 rounded-xl font-semibold transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg">
              <span className="flex items-center justify-center space-x-2">
                <Play className="w-4 h-4 fill-current" />
                <span>Join Stream</span>
              </span>
            </button>
          </div>
        </div>
      ))}
      
      {/* Show All Live Events Button */}
      <div className="flex-shrink-0 w-72">
        <div className="glass rounded-xl p-4 h-full flex items-center justify-center border-2 border-dashed border-purple-500/30 hover:border-purple-500/50 transition-colors cursor-pointer group">
          <div className="text-center space-y-3">
            <div className="text-4xl group-hover:scale-110 transition-transform">🎵</div>
            <p className="text-white font-medium">View All Live Events</p>
            <p className="text-gray-400 text-sm">Discover more artists</p>
          </div>
        </div>
      </div>
    </div>
  )
}