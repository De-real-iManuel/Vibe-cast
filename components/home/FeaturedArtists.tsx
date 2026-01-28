'use client'

import { useState } from 'react'
import { Users, Play, Heart } from 'lucide-react'

const featuredArtists = [
  {
    id: 1,
    name: 'Burna Boy',
    followers: '2.1M',
    isLive: true,
    liveViewers: '12.5K',
    gradient: 'from-orange-500 to-red-500',
    genre: 'Afrobeats',
    verified: true
  },
  {
    id: 2,
    name: 'Wizkid',
    followers: '3.2M',
    isLive: false,
    gradient: 'from-purple-500 to-blue-500',
    genre: 'Afrobeats',
    verified: true
  },
  {
    id: 3,
    name: 'Tems',
    followers: '1.5M',
    isLive: true,
    liveViewers: '3.2K',
    gradient: 'from-pink-500 to-purple-500',
    genre: 'R&B/Soul',
    verified: true
  },
  {
    id: 4,
    name: 'Davido',
    followers: '2.8M',
    isLive: false,
    gradient: 'from-yellow-500 to-orange-500',
    genre: 'Afrobeats',
    verified: true
  }
]

export function FeaturedArtists() {
  const [followedArtists, setFollowedArtists] = useState<Set<number>>(new Set())

  const handleFollow = (artistId: number) => {
    const newFollowed = new Set(followedArtists)
    if (newFollowed.has(artistId)) {
      newFollowed.delete(artistId)
    } else {
      newFollowed.add(artistId)
    }
    setFollowedArtists(newFollowed)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {featuredArtists.map((artist) => (
        <div key={artist.id} className="glass rounded-xl p-6 hover:neon-glow transition-all duration-300 group">
          <div className="flex items-center space-x-4">
            {/* Artist Avatar */}
            <div className="relative">
              <div className={`w-16 h-16 bg-gradient-to-br ${artist.gradient} rounded-full pulse-glow`}></div>
              {artist.isLive && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Artist Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors">
                  {artist.name}
                </h3>
                {artist.verified && (
                  <span className="text-blue-400">✓</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{artist.followers}</span>
                </div>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                  {artist.genre}
                </span>
              </div>

              {artist.isLive && (
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center space-x-1 text-red-400 text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span>LIVE</span>
                  </div>
                  <span className="text-sm text-gray-400">{artist.liveViewers} watching</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-2">
              {artist.isLive ? (
                <button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2">
                  <Play className="w-3 h-3 fill-current" />
                  <span>Watch</span>
                </button>
              ) : (
                <button
                  onClick={() => handleFollow(artist.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                    followedArtists.has(artist.id)
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <Heart className={`w-3 h-3 ${followedArtists.has(artist.id) ? 'fill-current' : ''}`} />
                  <span>{followedArtists.has(artist.id) ? 'Following' : 'Follow'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}