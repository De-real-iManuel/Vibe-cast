'use client'

import { Home, Search, Library, Calendar, User } from 'lucide-react'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Library, label: 'Library', path: '/library' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: User, label: 'Profile', path: '/profile' }
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass border-t border-white/10 px-4 py-2">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            
            return (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'text-purple-400 bg-purple-500/20' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'neon-glow' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}