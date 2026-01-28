'use client'

import { TrendingUp, Clock, Heart, Calendar } from 'lucide-react'

export function UserStats() {
  const stats = {
    totalListeningTime: '47h 23m',
    favoriteGenre: 'Afrobeats',
    topArtist: 'Burna Boy',
    eventsThisMonth: 3,
    streakDays: 12,
    vibeScore: 94
  }

  const monthlyActivity = [
    { month: 'Jan', hours: 32 },
    { month: 'Feb', hours: 45 },
    { month: 'Mar', hours: 38 },
    { month: 'Apr', hours: 52 },
    { month: 'May', hours: 47 }
  ]

  const topGenres = [
    { name: 'Afrobeats', percentage: 65, color: 'bg-orange-500' },
    { name: 'R&B', percentage: 20, color: 'bg-purple-500' },
    { name: 'Hip-Hop', percentage: 10, color: 'bg-blue-500' },
    { name: 'Others', percentage: 5, color: 'bg-gray-500' }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Your Music Journey</h2>
      
      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">{stats.totalListeningTime}</div>
          <div className="text-xs text-gray-400">Total Listening</div>
        </div>
        
        <div className="glass rounded-xl p-4 text-center">
          <Heart className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">{stats.topArtist}</div>
          <div className="text-xs text-gray-400">Top Artist</div>
        </div>
        
        <div className="glass rounded-xl p-4 text-center">
          <Calendar className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">{stats.eventsThisMonth}</div>
          <div className="text-xs text-gray-400">Events This Month</div>
        </div>
        
        <div className="glass rounded-xl p-4 text-center">
          <TrendingUp className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">{stats.vibeScore}/100</div>
          <div className="text-xs text-gray-400">AI Vibe Score</div>
        </div>
      </div>

      {/* Monthly Activity Chart */}
      <div className="glass rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4">Monthly Listening Activity</h3>
        <div className="flex items-end space-x-4 h-32">
          {monthlyActivity.map((month, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-lg transition-all duration-1000 hover:from-purple-500 hover:to-pink-400"
                style={{ height: `${(month.hours / 60) * 100}%` }}
              ></div>
              <div className="text-xs text-gray-400 mt-2">{month.month}</div>
              <div className="text-xs text-white font-medium">{month.hours}h</div>
            </div>
          ))}
        </div>
      </div>

      {/* Genre Distribution */}
      <div className="glass rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4">Your Music Taste</h3>
        <div className="space-y-3">
          {topGenres.map((genre, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-16 text-sm text-gray-400">{genre.name}</div>
              <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${genre.color} transition-all duration-1000`}
                  style={{ width: `${genre.percentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-white font-medium w-8">{genre.percentage}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Streak Counter */}
      <div className="glass rounded-xl p-6 text-center">
        <div className="text-4xl mb-2">🔥</div>
        <div className="text-2xl font-bold text-orange-400 mb-1">{stats.streakDays} Days</div>
        <div className="text-sm text-gray-400 mb-3">Listening Streak</div>
        <div className="text-xs text-gray-500">Keep the vibe alive! Listen daily to maintain your streak</div>
      </div>
    </div>
  )
}