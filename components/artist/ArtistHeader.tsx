'use client'

import { Play, Users, Gift, Share2 } from 'lucide-react'

interface Artist {
  name: string;
  verified: boolean;
  followers: string;
  bio: string;
  coverImage: string;
  avatar: string;
  isLive: boolean;
  liveViewers?: string;
}

interface ArtistHeaderProps {
  artist: Artist;
}

export function ArtistHeader({ artist }: ArtistHeaderProps) {
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className={`h-48 ${artist.coverImage} relative`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        {/* Live Indicator */}
        {artist.isLive && (
          <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">LIVE</span>
            <Users className="w-3 h-3" />
            <span className="text-sm">{artist.liveViewers}</span>
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 -mt-16 relative z-10">
        <div className="flex items-end space-x-4 mb-4">
          <div className={`w-24 h-24 ${artist.avatar} rounded-full border-4 border-black pulse-glow`}></div>
          
          <div className="flex-1 pb-2">
            <div className="flex items-center space-x-2 mb-1">
              <h1 className="text-2xl font-bold text-white">{artist.name}</h1>
              {artist.verified && <span className="text-blue-400 text-xl">✓</span>}
            </div>
            <p className="text-gray-400">{artist.followers} followers</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-300 mb-4 leading-relaxed">{artist.bio}</p>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 mb-6">
          {artist.isLive ? (
            <button className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 py-3 rounded-xl font-semibold transition-all duration-300 neon-glow">
              <div className="flex items-center justify-center space-x-2">
                <Play className="w-5 h-5 fill-current" />
                <span>Watch Live</span>
              </div>
            </button>
          ) : (
            <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-3 rounded-xl font-semibold transition-all duration-300">
              Follow
            </button>
          )}
          
          <button className="p-3 glass rounded-xl hover:neon-glow transition-all duration-300">
            <Gift className="w-5 h-5 text-yellow-400" />
          </button>
          
          <button className="p-3 glass rounded-xl hover:bg-white/20 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}