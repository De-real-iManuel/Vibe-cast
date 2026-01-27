'use client'

import { useState } from 'react'
import { X, Crown, Heart, Star, Flame, Gift as GiftIcon } from 'lucide-react'

const gifts = [
  { id: 1, name: 'Rose', icon: '🌹', price: 50, color: 'from-red-500 to-pink-500' },
  { id: 2, name: 'Fire', icon: '🔥', price: 100, color: 'from-orange-500 to-red-500' },
  { id: 3, name: 'Crown', icon: '👑', price: 500, color: 'from-yellow-500 to-orange-500' },
  { id: 4, name: 'Diamond', icon: '💎', price: 1000, color: 'from-blue-500 to-purple-500' },
  { id: 5, name: 'Rocket', icon: '🚀', price: 2000, color: 'from-purple-500 to-pink-500' },
  { id: 6, name: 'Lightning', icon: '⚡', price: 5000, color: 'from-yellow-400 to-orange-400' }
]

const topGifters = [
  { name: 'NaijaVibes', amount: 15000, avatar: 'from-purple-500 to-blue-500' },
  { name: 'AfrobeatKing', amount: 12500, avatar: 'from-orange-500 to-red-500' },
  { name: 'LagosLive', amount: 8900, avatar: 'from-green-500 to-blue-500' }
]

interface GiftPanelProps {
  isOpen?: boolean
  onClose?: () => void
}

export function GiftPanel({ isOpen = false, onClose }: GiftPanelProps) {
  const [selectedGift, setSelectedGift] = useState<number | null>(null)
  const [giftCount, setGiftCount] = useState(1)

  if (!isOpen) return null

  const selectedGiftData = gifts.find(g => g.id === selectedGift)
  const totalCost = selectedGiftData ? selectedGiftData.price * giftCount : 0

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-gray-900 rounded-t-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Send Gift</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Gifters */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-400">Top Gifters</h3>
          <div className="flex items-center space-x-3">
            {topGifters.map((gifter, index) => (
              <div key={index} className="flex items-center space-x-2 glass rounded-lg p-2">
                <div className={`w-6 h-6 bg-gradient-to-br ${gifter.avatar} rounded-full`}></div>
                <div>
                  <p className="text-xs font-medium text-white">{gifter.name}</p>
                  <p className="text-xs text-gray-400">₦{gifter.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gift Selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-400">Choose Gift</h3>
          <div className="grid grid-cols-3 gap-3">
            {gifts.map((gift) => (
              <button
                key={gift.id}
                onClick={() => setSelectedGift(gift.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedGift === gift.id
                    ? 'border-purple-500 bg-purple-500/20 neon-glow'
                    : 'border-white/10 hover:border-white/20 glass'
                }`}
              >
                <div className="text-center space-y-2">
                  <div className="text-2xl">{gift.icon}</div>
                  <p className="text-xs font-medium text-white">{gift.name}</p>
                  <p className="text-xs text-gray-400">₦{gift.price}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity & Send */}
        {selectedGift && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Quantity</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setGiftCount(Math.max(1, giftCount - 1))}
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  -
                </button>
                <span className="text-white font-medium w-8 text-center">{giftCount}</span>
                <button
                  onClick={() => setGiftCount(giftCount + 1)}
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-lg font-bold">
              <span className="text-white">Total</span>
              <span className="text-green-400">₦{totalCost.toLocaleString()}</span>
            </div>

            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-3 rounded-xl font-semibold text-white transition-all duration-300 neon-glow">
              Send Gift 🎁
            </button>

            <p className="text-xs text-gray-500 text-center">
              80% goes to artist • 20% platform fee
            </p>
          </div>
        )}
      </div>
    </div>
  )
}