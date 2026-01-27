import { LiveNowCarousel } from '@/components/home/LiveNowCarousel'
import { TrendingTracks } from '@/components/home/TrendingTracks'
import { HeroSection } from '@/components/home/HeroSection'
import { BottomNav } from '@/components/layout/BottomNav'
import { MiniPlayer } from '@/components/player/MiniPlayer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Content */}
      <div className="px-4 pb-32 space-y-8">
        {/* Live Now */}
        <section>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🔴 Live Now
          </h2>
          <LiveNowCarousel />
        </section>

        {/* Trending Tracks */}
        <section>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
            🔥 Trending Tracks
          </h2>
          <TrendingTracks />
        </section>

        {/* Recommended */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-white">
            ✨ Recommended for You
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass rounded-xl p-4 hover:neon-glow transition-all duration-300">
                <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-3"></div>
                <h3 className="font-semibold text-sm truncate">Track {i + 1}</h3>
                <p className="text-xs text-gray-400 truncate">Artist Name</p>
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