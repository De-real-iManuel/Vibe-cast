'use client'

import { useEffect, useState } from 'react'
import { Play, Heart, Gift, TrendingUp, Pause } from 'lucide-react'
import { Track } from '@/types/database'

export function TrendingTracks() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set())

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

  const getTrendingIcon = (index: number) => {
    if (index === 0) return '👑'
    if (index === 1) return '🔥'
    if (index === 2) return '⚡'
    return '🎵'
  }

  const handlePlay = (trackId: string) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId)
  }

  const handleLike = (trackId: string) => {
    const newLiked = new Set(likedTracks)
    if (newLiked.has(trackId)) {
      newLiked.delete(trackId)
    } else {
      newLiked.add(trackId)
    }
    setLikedTracks(newLiked)
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
        <div key={track.id} className="glass rounded-xl p-4 hover:neon-glow transition-all duration-300 group relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
            <div className={`w-full h-full bg-gradient-to-r ${getCoverGradient(index)}`}></div>
          </div>
          
          <div className="relative z-10 flex items-center space-x-4">
            {/* Rank with Icon */}
            <div className="flex flex-col items-center space-y-1">
              <div className="text-2xl font-bold text-gray-500 flex items-center space-x-1">
                <span>{index + 1}</span>
                {index < 3 && <TrendingUp className="w-4 h-4 text-green-400" />}
              </div>
              <span className="text-lg">{getTrendingIcon(index)}</span>
            </div>

            {/* Album Cover with Play Button */}
            <div className="relative group/cover">
              <div className={`w-14 h-14 bg-gradient-to-br ${getCoverGradient(index)} rounded-lg relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20"></div>
                {playingTrack === track.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></div>
                  </div>
                )}
              </div>
              <button
                onClick={() => handlePlay(track.id)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300 bg-black/40 rounded-lg"
              >
                {playingTrack === track.id ? (
                  <Pause className="w-6 h-6 text-white fill-current" />
                ) : (
                  <Play className="w-6 h-6 text-white fill-current" />
                )}
              </button>
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                  {track.title}
                </h3>
                {playingTrack === track.id && (
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-purple-500 animate-pulse"></div>
                    <div className="w-1 h-4 bg-pink-500 animate-pulse" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1 h-4 bg-purple-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-400 truncate">{track.artist?.name}</p>
                {track.artist?.verified && (
                  <span className="text-blue-400 text-xs">✓</span>
                )}
              </div>
              
              {/* Progress Bar for Playing Track */}
              {playingTrack === track.id && (
                <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full w-1/3 animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="text-right space-y-1">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-green-400">{formatPlays(track.play_count)}</p>
                <span className="text-xs text-gray-500">plays</span>
              </div>
              <p className="text-xs text-gray-500">{formatDuration(track.duration)}</p>
              
              {/* Tip Amount */}
              {track.total_tips > 0 && (
                <p className="text-xs text-yellow-400">₦{(track.total_tips / 100).toLocaleString()}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => handleLike(track.id)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  likedTracks.has(track.id)
                    ? 'text-red-400 bg-red-500/20 scale-110'
                    : 'text-gray-400 hover:text-red-400 hover:bg-white/10'
                }`}
              >
                <Heart className={`w-4 h-4 ${likedTracks.has(track.id) ? 'fill-current' : ''}`} />
              </button>
              
              <button className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110">
                <Gift className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Trending Badge for Top 3 */}
          {index < 3 && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                index === 1 ? 'bg-orange-500/20 text-orange-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                #{index + 1} Trending
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}