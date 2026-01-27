'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatBoxProps {
  eventId: string;
}

export function ChatBox({ eventId }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: Set up Supabase realtime subscription
    fetchMessages();
  }, [eventId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/chat?event_id=${eventId}`);
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: newMessage,
          event_id: eventId,
          user_id: 'temp-user-id' // TODO: Get from auth
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => [...prev, data.message]);
        setNewMessage('');
      } else {
        alert(`Message blocked: ${data.reason}`);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'excited': return 'text-purple-600';
      case 'negative': return 'text-red-600';
      case 'toxic': return 'text-red-800';
      default: return 'text-gray-600';
    }
  };

  const getSentimentEmoji = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'excited': return '🔥';
      case 'negative': return '😕';
      case 'toxic': return '⚠️';
      default: return '';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b p-4">
        <h3 className="font-semibold text-gray-900">Live Chat</h3>
        <p className="text-sm text-gray-500">{messages.length} messages</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm text-gray-900">
                User {message.user_id?.slice(-4)}
              </span>
              <div className="flex items-center space-x-1">
                {message.ai_sentiment && (
                  <span className="text-xs">
                    {getSentimentEmoji(message.ai_sentiment)}
                  </span>
                )}
                <span className="text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
            <p className={`text-sm ${getSentimentColor(message.ai_sentiment)}`}>
              {message.message}
            </p>
            {message.moderation_status === 'flagged' && (
              <div className="mt-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                Flagged by AI
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t p-4">
        <form onSubmit={sendMessage} className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={sending}
            className="flex-1"
          />
          <Button type="submit" disabled={sending || !newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          Messages are moderated by AI for safety
        </p>
      </div>
    </div>
  );
}