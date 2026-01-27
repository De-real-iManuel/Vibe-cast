import { MusicPlayer } from '@/components/player/MusicPlayer'

export default function PlayerPage() {
  const currentTrack = {
    id: 1,
    title: "Last Last",
    artist: "Burna Boy",
    album: "Love, Damini",
    duration: 225, // 3:45 in seconds
    currentTime: 95, // 1:35 in seconds
    cover: "bg-gradient-to-br from-orange-500 to-red-500",
    lyrics: [
      { time: 0, text: "Show me love, oh" },
      { time: 15, text: "I no go give you love for free" },
      { time: 30, text: "You go pay me with your heart, oh" },
      { time: 45, text: "Last last, na everybody go chop breakfast" },
      { time: 60, text: "Last last, na everybody go chop breakfast" },
      { time: 90, text: "Show me love, show me love" },
      { time: 105, text: "I no go give you love for free" },
      { time: 120, text: "You go pay me with your heart" }
    ],
    isLiked: true,
    artistTips: 15420 // Total tips in NGN
  }

  return (
    <div className="min-h-screen bg-black">
      <MusicPlayer track={currentTrack} />
    </div>
  )
}