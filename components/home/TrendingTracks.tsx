'use client'

import { useEffect, useState } from 'react'
import { Play, Heart, Gift } from 'lucide-react'
import { Track } from '@/types/database'

export function TrendingTracks() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTracks()
  }, [])

  const fetchTracks = async () => {
    try {
      const response = await fetch('/api/tracks')
      const data = await response.json()
      if (data.success) {
        setTracks(data.tracks)
      }
    } catch (error) {
      console.error('Failed to fetch tracks:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatPlays = (plays: number) => {
    if (plays >= 1000000) {
      return `${(plays / 1000000).toFixed(1)}M`
    } else if (plays >= 1000) {
      return `${(plays / 1000).toFixed(1)}K`
    }
    return plays.toString()
  }

  const getCoverGradient = (index: number) => {
    const gradients = [
      'from-orange-500 to-red-500',
      'from-blue-500 to-purple-500',
      'from-pink-500 to-purple-500',
      'from-yellow-500 to-orange-500',
      'from-green-500 to-blue-500'
    ]
    return gradients[index % gradients.length]
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass rounded-xl p-4 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-6 bg-gray-700 rounded"></div>
              <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tracks.map((track, index) => (
        <div key={track.id} className="glass rounded-xl p-4 hover:neon-glow transition-all duration-300 group">
          <div className="flex items-center space-x-4">
            {/* Rank */}
            <div className="text-2xl font-bold text-gray-500 w-8">
              {index + 1}
            </div>

            {/* Album Cover */}
            <div className="relative">
              <div className={`w-12 h-12 bg-gradient-to-br ${getCoverGradient(index)} rounded-lg`}></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Play className="w-4 h-4 text-white fill-current" />
              </div>
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate">{track.title}</h3>
              <div className="flex items-center space-x-1">
                <p className="text-sm text-gray-400 truncate">{track.artist?.name}</p>
                {track.artist?.verified && (
                  <span className="text-blue-400 text-xs">✓</span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="text-right">
              <p className="text-sm font-medium text-green-400">{formatPlays(track.play_count)}</p>
              <p className="text-xs text-gray-500">{formatDuration(track.duration)}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Gift className="w-4 h-4 text-yellow-400" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}