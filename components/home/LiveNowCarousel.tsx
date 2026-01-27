'use client'

import { useEffect, useState } from 'react'
import { Play, Users } from 'lucide-react'
import { LiveEvent } from '@/types/database'

export function LiveNowCarousel() {
  const [liveStreams, setLiveStreams] = useState<LiveEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLiveStreams()
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

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
      {liveStreams.map((stream, index) => (
        <div key={stream.id} className="flex-shrink-0 w-72">
          <div className="glass rounded-xl p-4 hover:neon-glow transition-all duration-300 group cursor-pointer">
            {/* Live Indicator */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-red-400">LIVE</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-400">
                <Users className="w-3 h-3" />
                <span>{stream.viewer_count.toLocaleString()}</span>
              </div>
            </div>

            {/* Artist Avatar */}
            <div className="relative mb-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${getAvatarGradient(index)} rounded-full mx-auto pulse-glow`}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Stream Info */}
            <div className="text-center space-y-2">
              <h3 className="font-bold text-lg text-white">{stream.artist?.name}</h3>
              <p className="text-sm text-gray-300 truncate">{stream.title}</p>
              <span className="inline-block px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                Afrobeats
              </span>
            </div>

            {/* Join Button */}
            <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-2 rounded-lg font-medium transition-all duration-300 transform group-hover:scale-105">
              Join Stream
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}