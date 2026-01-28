import { LiveNowCarousel } from '@/components/home/LiveNowCarousel'
import { TrendingTracks } from '@/components/home/TrendingTracks'
import { HeroSection } from '@/components/home/HeroSection'
import { BottomNav } from '@/components/layout/BottomNav'
import { MiniPlayer } from '@/components/player/MiniPlayer'
import { QuickActions } from '@/components/home/QuickActions'
import { FeaturedArtists } from '@/components/home/FeaturedArtists'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Content */}
      <div className="px-4 pb-32 space-y-8">
        {/* Quick Actions */}
        <QuickActions />
        
        {/* Live Now */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🔴 Live Now
            </h2>
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              View All
            </button>
          </div>
          <LiveNowCarousel />
        </section>

        {/* Trending Tracks */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
              🔥 Trending Tracks
            </h2>
            <button className="text-sm text-green-400 hover:text-green-300 transition-colors">
              See More
            </button>
          </div>
          <TrendingTracks />
        </section>

        {/* Featured Artists */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-white">
            ⭐ Featured Artists
          </h2>
          <FeaturedArtists />
        </section>

        {/* Recommended */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-white">
            ✨ Recommended for You
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass rounded-xl p-4 hover:neon-glow transition-all duration-300 group cursor-pointer">
                <div className={`aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-3 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-lg">🎵</span>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-sm truncate group-hover:text-purple-300 transition-colors">
                  Track {i + 1}
                </h3>
                <p className="text-xs text-gray-400 truncate">Artist Name</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-green-400">2.1M plays</span>
                  <span className="text-xs text-gray-500">3:45</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Mini Player */}
      <MiniPlayer />
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}