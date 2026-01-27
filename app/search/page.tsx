import { SearchResults } from '@/components/search/SearchResults'
import { BottomNav } from '@/components/layout/BottomNav'

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SearchResults />
      <BottomNav />
    </div>
  )
}