'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Heart, Shuffle, Repeat, Gift, Share2, ChevronDown } from 'lucide-react'

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  currentTime: number;
  cover: string;
  lyrics: Array<{ time: number; text: string }>;
  isLiked: boolean;
  artistTips: number;
}

interface MusicPlayerProps {
  track: Track;
}

export function MusicPlayer({ track }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(track.currentTime)
  const [isLiked, setIsLiked] = useState(track.isLiked)
  const [showLyrics, setShowLyrics] = useState(true)
  const [showGiftModal, setShowGiftModal] = useState(false)

  // Find current lyric
  const currentLyric = track.lyrics
    .filter(lyric => lyric.time <= currentTime)
    .pop()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = (currentTime / track.duration) * 100

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Blur */}
      <div className={`absolute inset-0 ${track.cover} opacity-10 blur-3xl`}></div>
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ChevronDown className="w-6 h-6" />
        </button>
        <div className="text-center">
          <p className="text-sm text-gray-400">Playing from</p>
          <p className="font-medium">{track.album}</p>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Share2 className="w-6 h-6" />
        </button>
      </div>

      {/* Album Art */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-8">
        <div className="relative">
          <div className={`w-80 h-80 ${track.cover} rounded-2xl shadow-2xl pulse-glow`}>
            <div className="absolute inset-0 waveform rounded-2xl opacity-30"></div>
          </div>
          
          {/* Floating Waveform */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex items-end space-x-1">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Track Info */}
      <div className="relative z-10 px-8 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold truncate">{track.title}</h1>
            <p className="text-lg text-gray-400 truncate">{track.artist}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-colors ${
                isLiked ? 'text-red-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={() => setShowGiftModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 px-4 py-2 rounded-full transition-all duration-300"
            >
              <Gift className="w-4 h-4" />
              <span className="text-sm font-medium">Gift Artist</span>
            </button>
          </div>
        </div>

        {/* Artist Tips */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
          <span>💰 ₦{track.artistTips.toLocaleString()} earned today</span>
          <span>•</span>
          <span>80% goes to artist</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 px-8 mb-6">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 flex items-center justify-center space-x-8 px-8 mb-6">
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <Shuffle className="w-5 h-5" />
        </button>
        
        <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
          <SkipBack className="w-6 h-6 fill-current" />
        </button>
        
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-4 bg-white text-black rounded-full hover:scale-105 transition-transform"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 fill-current" />
          ) : (
            <Play className="w-8 h-8 fill-current" />
          )}
        </button>
        
        <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
          <SkipForward className="w-6 h-6 fill-current" />
        </button>
        
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <Repeat className="w-5 h-5" />
        </button>
      </div>

      {/* Lyrics Panel */}
      {showLyrics && (
        <div className="relative z-10 glass rounded-t-3xl p-6 max-h-48 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Lyrics</h3>
            <button
              onClick={() => setShowLyrics(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            {track.lyrics.map((lyric, index) => (
              <p
                key={index}
                className={`transition-all duration-300 ${
                  currentLyric?.text === lyric.text
                    ? 'text-white font-medium text-lg'
                    : 'text-gray-400'
                }`}
              >
                {lyric.text}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Gift Modal */}
      {showGiftModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-gray-900 rounded-t-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Gift {track.artist}</h2>
              <button
                onClick={() => setShowGiftModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { amount: 50, emoji: '🌹' },
                { amount: 100, emoji: '🔥' },
                { amount: 500, emoji: '👑' },
                { amount: 1000, emoji: '💎' },
                { amount: 2000, emoji: '🚀' },
                { amount: 5000, emoji: '⚡' }
              ].map((gift) => (
                <button
                  key={gift.amount}
                  className="glass rounded-xl p-4 hover:neon-glow transition-all duration-300 text-center"
                >
                  <div className="text-2xl mb-2">{gift.emoji}</div>
                  <div className="text-sm font-medium">₦{gift.amount}</div>
                </button>
              ))}
            </div>
            
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-3 rounded-xl font-semibold transition-all duration-300">
              Send Gift 🎁
            </button>
          </div>
        </div>
      )}
    </div>
  )
}