'use client'

import { useState } from 'react'
import { Settings, Edit3, Share2, Crown, Flame } from 'lucide-react'

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)

  const user = {
    name: 'Afrobeats Lover',
    username: '@vibemaster',
    bio: 'Living for the rhythm 🎵 | Burna Boy stan | Lagos vibes ✨',
    avatar: 'from-purple-500 to-pink-500',
    level: 'Vibe Master',
    joinDate: 'March 2024',
    location: 'Lagos, Nigeria'
  }

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-4 left-4 animate-bounce">
          <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-6 right-8 animate-pulse">
          <div className="w-4 h-4 bg-pink-400 rounded-full opacity-40"></div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-4 -mt-16 relative z-10">
        <div className="flex items-end justify-between mb-4">
          {/* Avatar */}
          <div className="relative">
            <div className={`w-24 h-24 bg-gradient-to-br ${user.avatar} rounded-full border-4 border-black pulse-glow`}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Level Badge */}
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 px-2 py-1 rounded-full flex items-center space-x-1">
              <Crown className="w-3 h-3 text-white" />
              <span className="text-xs font-bold text-white">VIP</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <Edit3 className="w-4 h-4 text-white" />
            </button>
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <Share2 className="w-4 h-4 text-white" />
            </button>
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <Settings className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-purple-400">{user.username}</p>
          </div>

          <p className="text-gray-300 leading-relaxed">{user.bio}</p>

          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>{user.level}</span>
            </div>
            <span>•</span>
            <span>📍 {user.location}</span>
            <span>•</span>
            <span>Joined {user.joinDate}</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">47</div>
            <div className="text-xs text-gray-400">Liked Songs</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">12</div>
            <div className="text-xs text-gray-400">Events Attended</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">₦2.5K</div>
            <div className="text-xs text-gray-400">Gifts Sent</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="glass rounded-xl p-4">
          <h3 className="font-semibold text-white mb-3 flex items-center space-x-2">
            <span>🏆</span>
            <span>Recent Achievements</span>
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 bg-yellow-500/10 rounded-lg">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">VIP Status Unlocked!</p>
                <p className="text-xs text-gray-400">Attended 10+ live events</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-2 bg-purple-500/10 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Vibe Master</p>
                <p className="text-xs text-gray-400">AI detected your perfect music taste</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}