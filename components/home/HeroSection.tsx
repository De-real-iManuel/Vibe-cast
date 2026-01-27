'use client'

import { useState, useEffect } from 'react'
import { Play } from 'lucide-react'

const featuredEvents = [
  {
    artist: "Burna Boy",
    event: "African Giant Live",
    viewers: "12.5K",
    image: "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
  },
  {
    artist: "Wizkid",
    event: "Made in Lagos Tour",
    viewers: "8.2K", 
    image: "bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"
  },
  {
    artist: "Davido",
    event: "Timeless Concert",
    viewers: "15.1K",
    image: "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
  }
]

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredEvents.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const current = featuredEvents[currentIndex]

  return (
    <div className="relative h-96 overflow-hidden">
      <div className={`absolute inset-0 ${current.image} opacity-20`}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-red-400">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">LIVE NOW</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold">
            Catch{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {current.artist}
            </span>{' '}
            Live Now
          </h1>
          
          <p className="text-xl text-gray-300 max-w-md mx-auto">
            {current.event} – Join the Vibe!
          </p>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span>{current.viewers} watching</span>
            <span>•</span>
            <span>🔥 Trending #1</span>
          </div>
          
          <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 neon-glow">
            <div className="flex items-center space-x-2">
              <Play className="w-6 h-6 fill-current" />
              <span>Join Stream</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredEvents.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-purple-400 w-8' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}