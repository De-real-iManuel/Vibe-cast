import { LivePlayer } from '@/components/live/LivePlayer'
import { LiveChat } from '@/components/live/LiveChat'
import { GiftPanel } from '@/components/live/GiftPanel'

export default function LivePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          <LivePlayer />
        </div>
        
        {/* Chat Sidebar */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/10">
          <LiveChat />
        </div>
      </div>
      
      {/* Gift Panel */}
      <GiftPanel />
    </div>
  )
}