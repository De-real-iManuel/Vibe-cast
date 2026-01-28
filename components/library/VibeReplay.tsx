'use client'

import { useState, useEffect } from 'react'
import { Play, Sparkles, TrendingUp, Heart, Share2, Clock } from 'lucide-react'

interface VibeHighlight {
  id: string
  eventTitle: string
  artistName: string
  timestamp: string
  duration: number
  vibeScore: number
  aiDescription: string
  thumbnailGradient: string
  emotions: string[]
  peakMoment: string
  crowdReaction: string
}

export function VibeReplay() {
  const [highlights, setHighlights] = useState<VibeHighlight[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVibeHighlights()
  }, [])

  const fetchVibeHighlights = async () => {
    // Mock AI-generated highlights - in real app would call Gemini API
    const mockHighlights: VibeHighlight[] = [
      {
        id: '1',
        eventTitle: 'African Giant Live',
        artistName: 'Burna Boy',
        timestamp: '2:45',
        duration: 45,
        vibeScore: 98,
        aiDescription: 'Crowd erupted in pure euphoria as the beat dropped. Energy levels peaked with synchronized jumping and singing.',
        thumbnailGradient: 'from-orange-500 to-red-500',
        emotions: ['euphoric', 'energetic', 'unified'],
        peakMoment: 'Beat drop at 2:47',
        crowdReaction: 'Massive sing-along'
      },
      {
        id: '2',
        eventTitle: 'For Broken Ears Session',
        artistName: 'Tems',
        timestamp: '1:23',
        duration: 32,
        vibeScore: 94,
        aiDescription: 'Intimate moment where the entire crowd swayed in perfect harmony. Emotional connection at its peak.',
        thumbnailGradient: 'from-pink-500 to-purple-500',
        emotions: ['emotional', 'connected', 'peaceful'],
        peakMoment: 'Vocal climax at 1:35',
        crowdReaction: 'Silent appreciation'
      },
      {
        id: '3',
        eventTitle: 'Rave & Roses Tour',
        artistName: 'Rema',
        timestamp: '3:12',
        duration: 28,
        vibeScore: 96,
        aiDescription: 'Lightning effects synchronized with crowd movement created a magical atmosphere. Pure artistic brilliance.',
        thumbnailGradient: 'from-blue-500 to-purple-500',
        emotions: ['amazed', 'hyped', 'mesmerized'],
        peakMoment: 'Light show sync at 3:15',
        crowdReaction: 'Phones up recording'
      }
    ]
    
    setHighlights(mockHighlights)
    setLoading(false)
  }

  const categories = [
    { id: 'all', label: 'All Vibes', emoji: '✨' },
    { id: 'euphoric', label: 'Euphoric', emoji: '🔥' },
    { id: 'emotional', label: 'Emotional', emoji: '💫' },
    { id: 'energetic', label: 'High Energy', emoji: '⚡' }
  ]

  const getVibeColor = (score: number) => {
    if (score >= 95) return 'text-yellow-400'
    if (score >= 90) return 'text-orange-400'
    if (score >= 85) return 'text-red-400'
    return 'text-purple-400'
  }

  const getVibeEmoji = (score: number) => {
    if (score >= 95) return '🔥'
    if (score >= 90) return '⚡'
    if (score >= 85) return '✨'
    return '💫'
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass rounded-xl p-4 animate-pulse">
            <div className="flex space-x-4">
              <div className="w-24 h-16 bg-gray-700 rounded-lg"></div>
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
    <div className="space-y-6">
      {/* AI Insight Banner */}
      <div className="glass rounded-xl p-4 border border-purple-500/30">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">AI Vibe Analysis</h3>
            <p className="text-sm text-gray-400">Gemini 3 found {highlights.length} peak vibe moments</p>
          </div>
        </div>
        <p className="text-sm text-purple-300">
          🤖 AI analyzed crowd energy, audio peaks, and visual cues to curate your most memorable concert moments
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
            }`}
          >
            <span>{category.emoji}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Vibe Highlights */}
      <div className="space-y-4">
        {highlights.map((highlight) => (
          <div key={highlight.id} className="glass rounded-xl p-4 hover:neon-glow transition-all duration-300 group cursor-pointer">
            <div className="flex space-x-4">
              {/* Thumbnail */}
              <div className="relative">
                <div className={`w-24 h-16 bg-gradient-to-br ${highlight.thumbnailGradient} rounded-lg relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-6 h-6 text-white fill-current" />
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1 py-0.5 rounded">
                    {highlight.duration}s
                  </div>
                </div>
                
                {/* Vibe Score */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {highlight.vibeScore}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {highlight.eventTitle}
                    </h3>
                    <p className="text-sm text-gray-400">{highlight.artistName}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg ${getVibeColor(highlight.vibeScore)}`}>
                      {getVibeEmoji(highlight.vibeScore)}
                    </span>
                    <span className="text-sm text-gray-500">@{highlight.timestamp}</span>
                  </div>
                </div>

                {/* AI Description */}
                <p className="text-sm text-gray-300 leading-relaxed">
                  🤖 {highlight.aiDescription}
                </p>

                {/* Emotions Tags */}
                <div className="flex items-center space-x-2">
                  {highlight.emotions.map((emotion, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                    >
                      {emotion}
                    </span>
                  ))}
                </div>

                {/* Peak Moment & Crowd Reaction */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{highlight.peakMoment}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{highlight.crowdReaction}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-purple-600 hover:bg-purple-500 rounded-full transition-colors">
                  <Play className="w-4 h-4 text-white fill-current" />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Generate More Button */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 mx-auto">
          <Sparkles className="w-5 h-5" />
          <span>Generate More Vibes</span>
        </button>
        <p className="text-xs text-gray-500 mt-2">AI will analyze your recent events for new highlights</p>
      </div>
    </div>
  )
}