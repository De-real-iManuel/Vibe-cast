import { ArtistHeader } from '@/components/artist/ArtistHeader'
import { ArtistTabs } from '@/components/artist/ArtistTabs'
import { BottomNav } from '@/components/layout/BottomNav'

export default function ArtistPage() {
  const artist = {
    name: "Burna Boy",
    verified: true,
    followers: "2.1M",
    bio: "African Giant 🦍 Grammy Winner 🏆 Spreading Afrobeats to the world 🌍",
    coverImage: "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500",
    avatar: "bg-gradient-to-br from-orange-500 to-red-500",
    isLive: true,
    liveViewers: "12.5K"
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ArtistHeader artist={artist} />
      <ArtistTabs artistId="burna-boy" />
      <BottomNav />
    </div>
  )
}