'use client'

import { useState } from 'react'
import { Users, Gift, Heart, MessageCircle, Share, Volume2 } from 'lucide-react'

export function LivePlayer() {
  const [viewerCount] = useState(12547)
  const [isGiftPanelOpen, setIsGiftPanelOpen] = useState(false)

  return (
    <div className="relative h-full bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      {/* Video Player Area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mx-auto pulse-glow"></div>
          <h1 className="text-4xl font-bold">Burna Boy</h1>
          <p className="text-xl text-gray-300">African Giant Live</p>
          <div className="waveform h-2 w-64 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Top Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-red-500/20 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">LIVE</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <Users className="w-4 h-4" />
              <span>{viewerCount.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <Volume2 className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold">Last Last</h2>
            <p className="text-sm text-gray-300">Now playing • 2:45 / 3:45</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-300 neon-glow">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Vibe!</span>
            </button>
            
            <button 
              onClick={() => setIsGiftPanelOpen(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-yellow-600 to-orange-600 px-4 py-2 rounded-full hover:from-yellow-500 hover:to-orange-500 transition-all duration-300"
            >
              <Gift className="w-4 h-4" />
              <span className="text-sm font-medium">Gift</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Reactions */}
      <div className="absolute right-4 bottom-20 space-y-2">
        {['🔥', '❤️', '🎤', '✨', '🎵'].map((emoji, index) => (
          <div
            key={index}
            className="text-2xl animate-bounce"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Current Song Lyrics */}
      <div className="absolute left-4 bottom-20 max-w-xs">
        <div className="glass rounded-lg p-3 space-y-1">
          <p className="text-xs text-gray-400">Current lyrics:</p>
          <p className="text-sm font-medium">"I no go give you love for free"</p>
          <p className="text-sm">"You go pay me with your heart"</p>
        </div>
      </div>
    </div>
  )
}