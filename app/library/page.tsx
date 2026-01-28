import { BottomNav } from '@/components/layout/BottomNav'

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-4 pb-32">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🎵</div>
          <h1 className="text-2xl font-bold mb-2">Your Library</h1>
          <p className="text-gray-400">Coming soon...</p>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}