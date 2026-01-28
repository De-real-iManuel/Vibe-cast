'use client'

import { useState, useEffect } from 'react'
import { Play, Users, Heart } from 'lucide-react'

const featuredArtists = [
  {
    name: "Burna Boy",
    event: "African Giant Live",
    viewers: "12.5K",
    status: "LIVE NOW",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    description: "Grammy winner performing hits from Love, Damini"
  },
  {
    name: "Wizkid",
    event: "Made in Lagos Tour",
    viewers: "8.2K", 
    status: "LIVE NOW",
    gradient: "from-purple-500 via-blue-500 to-green-500",
    description: "Starboy bringing the energy with classic hits"
  },
  {
    name: "Tems",
    event: "For Broken Ears Session",
    viewers: "5.1K",
    status: "LIVE NOW", 
    gradient: "from-pink-500 via-purple-500 to-blue-500",
    description: "Intimate acoustic performance of Grammy hits"
  }
]

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredArtists.length)
        setIsAnimating(false)
      }, 300)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const current = featuredArtists[currentIndex]

  return (
    <div className="relative h-96 overflow-hidden">
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${current.gradient} opacity-20 transition-all duration-1000`}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 animate-bounce">
        <div className="w-4 h-4 bg-purple-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-20 right-20 animate-pulse">
        <div className="w-6 h-6 bg-pink-400 rounded-full opacity-40"></div>
      </div>
      <div className="absolute bottom-20 left-20 animate-bounce" style={{animationDelay: '1s'}}>
        <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-50"></div>
      </div>
      
      <div className={`relative h-full flex items-center justify-center text-center px-4 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="space-y-6 max-w-2xl">
          {/* Live Indicator */}
          <div className="flex items-center justify-center space-x-3">
            <div className="flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/30">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-red-400">{current.status}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Users className="w-4 h-4" />
              <span>{current.viewers} watching</span>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Catch{' '}
              </span>
              <span className={`bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent`}>
                {current.name}
              </span>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {' '}Live
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 font-medium">
              {current.event}
            </p>
            
            <p className="text-gray-400 max-w-md mx-auto">
              {current.description}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 neon-glow flex items-center space-x-3">
              <Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
              <span>Join Stream</span>
            </button>
            
            <button className="group flex items-center space-x-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-6 py-3 rounded-full font-medium transition-all duration-300 border border-white/20">
              <Heart className="w-5 h-5 group-hover:text-red-400 transition-colors" />
              <span>Follow Artist</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {featuredArtists.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 h-2 bg-white rounded-full' 
                : 'w-2 h-2 bg-white/40 rounded-full hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}