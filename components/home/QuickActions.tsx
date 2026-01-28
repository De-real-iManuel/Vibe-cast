'use client'

import { Search, Calendar, Mic, Gift } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      icon: Search,
      label: 'Discover',
      description: 'Find new artists',
      gradient: 'from-blue-500 to-purple-500',
      action: () => router.push('/search')
    },
    {
      icon: Calendar,
      label: 'Events',
      description: 'Live concerts',
      gradient: 'from-green-500 to-blue-500',
      action: () => router.push('/events')
    },
    {
      icon: Mic,
      label: 'Go Live',
      description: 'Start streaming',
      gradient: 'from-red-500 to-pink-500',
      action: () => router.push('/live')
    },
    {
      icon: Gift,
      label: 'Support',
      description: 'Gift artists',
      gradient: 'from-yellow-500 to-orange-500',
      action: () => alert('Gift feature coming soon!')
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon
        return (
          <button
            key={index}
            onClick={action.action}
            className="glass rounded-xl p-4 hover:neon-glow transition-all duration-300 group text-center"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-full mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
              {action.label}
            </h3>
            <p className="text-xs text-gray-400 mt-1">{action.description}</p>
          </button>
        )
      })}
    </div>
  )
}