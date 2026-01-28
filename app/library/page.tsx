import { LibraryTabs } from '@/components/library/LibraryTabs'
import { VibeReplay } from '@/components/library/VibeReplay'
import { BottomNav } from '@/components/layout/BottomNav'

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-4 pb-32">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Your Library</h1>
          <p className="text-gray-400">Your music, events, and AI-curated vibes</p>
        </div>
        
        {/* AI Vibe Replay Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl">🤖</span>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Vibe Replay
            </h2>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
              Powered by Gemini 3
            </span>
          </div>
          <VibeReplay />
        </div>

        <LibraryTabs />
      </div>
      <BottomNav />
    </div>
  )
}