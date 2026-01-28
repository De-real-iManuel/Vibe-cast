'use client'

import { Play, Heart, Gift, Calendar, MessageCircle } from 'lucide-react'

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'liked',
      action: 'Liked',
      target: 'Calm Down by Rema',
      time: '2 hours ago',
      icon: Heart,
      color: 'text-red-400'
    },
    {
      id: 2,
      type: 'gift',
      action: 'Sent ₦500 gift to',
      target: 'Burna Boy during African Giant Live',
      time: '1 day ago',
      icon: Gift,
      color: 'text-yellow-400'
    },
    {
      id: 3,
      type: 'event',
      action: 'Attended',
      target: 'For Broken Ears Session by Tems',
      time: '3 days ago',
      icon: Calendar,
      color: 'text-green-400'
    },
    {
      id: 4,
      type: 'chat',
      action: 'Chatted in',
      target: 'Rave & Roses Tour live stream',
      time: '1 week ago',
      icon: MessageCircle,
      color: 'text-blue-400'
    },
    {
      id: 5,
      type: 'play',
      action: 'Played',
      target: 'Free Mind by Tems 15 times',
      time: '1 week ago',
      icon: Play,
      color: 'text-purple-400'
    }
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Recent Activity</h2>
      
      <div className="space-y-3">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="glass rounded-xl p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full bg-white/10 ${activity.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1">
                  <p className="text-white">
                    <span className="text-gray-400">{activity.action}</span>{' '}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                
                {activity.type === 'liked' && (
                  <Heart className="w-4 h-4 text-red-400 fill-current" />
                )}
                
                {activity.type === 'gift' && (
                  <div className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                    ₦500
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      
      <button className="w-full glass rounded-xl p-4 text-center text-gray-400 hover:text-white transition-colors">
        View All Activity
      </button>
    </div>
  )
}