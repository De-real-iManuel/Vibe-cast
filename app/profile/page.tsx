import { UserProfile } from '@/components/profile/UserProfile'
import { UserStats } from '@/components/profile/UserStats'
import { RecentActivity } from '@/components/profile/RecentActivity'
import { BottomNav } from '@/components/layout/BottomNav'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pb-32">
        <UserProfile />
        <div className="px-4 space-y-6">
          <UserStats />
          <RecentActivity />
        </div>
      </div>
      <BottomNav />
    </div>
  )
}