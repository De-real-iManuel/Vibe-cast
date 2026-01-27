'use client'

import { Play, Pause, SkipForward, Heart, Gift } from 'lucide-react'
import { useState } from 'react'

export function MiniPlayer() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 px-4">
      <div className="glass rounded-xl p-3 max-w-md mx-auto border border-purple-500/20">
        <div className="flex items-center space-x-3">
          {/* Album Art */}
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg waveform"></div>
          
          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white text-sm truncate">Calm Down</h4>
            <p className="text-xs text-gray-400 truncate">Rema</p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-1 rounded-full transition-colors ${
                isLiked ? 'text-red-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-purple-600 hover:bg-purple-500 rounded-full transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
            </button>
            
            <button className="p-1 text-gray-400 hover:text-white transition-colors">
              <SkipForward className="w-4 h-4" />
            </button>
            
            <button className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors">
              <Gift className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-2">
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  )
}