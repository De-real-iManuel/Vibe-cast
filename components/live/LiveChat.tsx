'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Gift, Heart, Flame, Mic, Sparkles } from 'lucide-react'

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  timestamp: string;
  vibe: string;
  sentiment: string;
  verified?: boolean;
  gift?: string;
  aiModerated?: boolean;
}

const quickReactions = [
  { icon: Flame, label: '🔥', color: 'text-orange-400' },
  { icon: Heart, label: '❤️', color: 'text-red-400' },
  { icon: Mic, label: '🎤', color: 'text-purple-400' },
  { icon: Sparkles, label: '✨', color: 'text-yellow-400' }
]

export function LiveChat() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, user: "NaijaVibes", message: "Burna Boy is on fire! 🔥🔥🔥", timestamp: "2m", vibe: "hyped", sentiment: "excited", verified: true },
    { id: 2, user: "AfrobeatsFan", message: "This beat is insane!", timestamp: "2m", vibe: "party", sentiment: "positive" },
    { id: 3, user: "LagosLive", message: "❤️❤️❤️ Love from Lagos!", timestamp: "1m", vibe: "emotional", sentiment: "positive" },
  ])
  const [isModeratingMessage, setIsModeratingMessage] = useState(false)
  const [currentVibe, setCurrentVibe] = useState({ description: 'Crowd going wild', energyLevel: 85 })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Real-time vibe analysis
  useEffect(() => {
    const analyzeVibe = async () => {
      try {
        const recentMessages = messages.slice(-10).map(m => m.message)
        const response = await fetch('/api/ai/vibe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chatMessages: recentMessages,
            artistName: 'Burna Boy',
            songTitle: 'Last Last'
          })
        })
        
        const data = await response.json()
        if (data.success) {
          setCurrentVibe({
            description: data.vibe.vibeDescription,
            energyLevel: data.vibe.energyLevel
          })
        }
      } catch (error) {
        console.error('Vibe analysis failed:', error)
      }
    }

    if (messages.length > 0) {
      analyzeVibe()
    }
  }, [messages])

  const sendMessage = async () => {
    if (!message.trim() || isModeratingMessage) return
    
    setIsModeratingMessage(true)
    
    try {
      // Real AI moderation with Gemini
      const moderationResponse = await fetch('/api/ai/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          artistName: 'Burna Boy',
          songTitle: 'Last Last',
          previousMessages: messages.slice(-5).map(m => m.message)
        })
      })

      const moderationData = await moderationResponse.json()
      
      if (moderationData.success && moderationData.moderation.allowed) {
        const newMessage: ChatMessage = {
          id: messages.length + 1,
          user: "You",
          message: message,
          timestamp: "now",
          vibe: moderationData.moderation.vibe,
          sentiment: moderationData.moderation.sentiment,
          aiModerated: true
        }
        
        setMessages([...messages, newMessage])
        setMessage('')
      } else {
        alert(`Message blocked: ${moderationData.moderation.reason || 'Inappropriate content'}`)
      }
    } catch (error) {
      console.error('Message moderation failed:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsModeratingMessage(false)
    }
  }

  const sendReaction = async (reaction: string) => {
    const newMessage: ChatMessage = {
      id: messages.length + 1,
      user: "You",
      message: reaction,
      timestamp: "now",
      vibe: "hyped",
      sentiment: "excited"
    }
    
    setMessages([...messages, newMessage])
  }

  const getVibeColor = (vibe: string) => {
    switch (vibe) {
      case 'hyped': return 'text-orange-300'
      case 'party': return 'text-pink-300'
      case 'emotional': return 'text-blue-300'
      case 'chill': return 'text-green-300'
      default: return 'text-gray-300'
    }
  }

  return (
    <div className="h-full flex flex-col bg-black/50 backdrop-blur-sm">
      {/* Chat Header with AI Vibe Analysis */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">Live Chat</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{messages.length} vibing</span>
          </div>
        </div>
        
        {/* AI Vibe Indicator */}
        <div className="glass rounded-lg p-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-purple-400">🤖 AI Vibe Check:</span>
            <span className="text-white font-medium">{currentVibe.description}</span>
          </div>
          <div className="mt-1 w-full bg-gray-700 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-1000"
              style={{ width: `${currentVibe.energyLevel}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="group">
            <div className="flex items-start space-x-2">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                msg.vibe === 'hyped' ? 'from-orange-500 to-red-500' :
                msg.vibe === 'party' ? 'from-pink-500 to-purple-500' :
                msg.vibe === 'emotional' ? 'from-blue-500 to-purple-500' :
                'from-green-500 to-blue-500'
              } flex-shrink-0`}></div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`font-medium text-sm ${
                    msg.verified ? 'text-blue-400' : 'text-white'
                  }`}>
                    {msg.user}
                    {msg.verified && <span className="ml-1">✓</span>}
                    {msg.aiModerated && <span className="ml-1 text-purple-400 text-xs">🤖</span>}
                  </span>
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  {msg.gift && <span className="text-lg">{msg.gift}</span>}
                </div>
                
                <p className={`text-sm break-words ${getVibeColor(msg.vibe)}`}>
                  {msg.message}
                </p>
                
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    msg.vibe === 'hyped' ? 'bg-orange-500/20 text-orange-300' :
                    msg.vibe === 'party' ? 'bg-pink-500/20 text-pink-300' :
                    msg.vibe === 'emotional' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-green-500/20 text-green-300'
                  }`}>
                    {msg.vibe}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reactions */}
      <div className="px-4 py-2 border-t border-white/10">
        <div className="flex items-center justify-around">
          {quickReactions.map((reaction, index) => {
            const Icon = reaction.icon
            return (
              <button
                key={index}
                onClick={() => sendReaction(reaction.label)}
                className={`p-2 rounded-full hover:bg-white/10 transition-colors ${reaction.color}`}
              >
                <Icon className="w-5 h-5" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Join the vibe..."
            disabled={isModeratingMessage}
            className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50"
          />
          
          <button
            onClick={sendMessage}
            disabled={!message.trim() || isModeratingMessage}
            className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isModeratingMessage ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
          
          <button className="p-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full hover:from-yellow-500 hover:to-orange-500 transition-all duration-300">
            <Gift className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          🤖 AI-moderated by Gemini • Afrobeats vibes welcome
        </p>
      </div>
    </div>
  )
}