export interface Artist {
  id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  cover_image_url?: string;
  verified: boolean;
  followers_count: number;
  total_earnings: number;
  is_live: boolean;
  live_viewers: number;
  created_at: string;
}

export interface Track {
  id: string;
  artist_id: string;
  title: string;
  album?: string;
  duration: number;
  audio_url?: string;
  cover_image_url?: string;
  lyrics?: Array<{ time: number; text: string }>;
  play_count: number;
  like_count: number;
  total_tips: number;
  created_at: string;
  artist?: Artist;
}

export interface LiveEvent {
  id: string;
  artist_id: string;
  title: string;
  description?: string;
  scheduled_time?: string;
  venue?: string;
  is_virtual: boolean;
  status: 'upcoming' | 'live' | 'ended';
  stream_url?: string;
  viewer_count: number;
  total_gifts: number;
  created_at: string;
  artist?: Artist;
}

export interface EventRecap {
  id: string;
  event_id: string;
  summary_text: string;
  highlights: Array<{
    timestamp: number;
    duration: number;
    title: string;
    description: string;
    energy_level: number;
    sentiment: string;
  }>;
  peak_moments: Array<{
    timestamp: number;
    type: string;
    value: number;
  }>;
  sentiment_analysis: {
    overall: string;
    timeline: Array<{ time: number; sentiment: number }>;
  };
  energy_graph: Array<{ time: number; energy: number }>;
  social_captions: {
    twitter?: string;
    instagram?: string;
  };
  generated_at: string;
  processing_time_seconds?: number;
}

export interface ChatMessage {
  id: string;
  event_id: string;
  user_name: string;
  message: string;
  sentiment?: 'positive' | 'excited' | 'neutral' | 'negative' | 'toxic';
  vibe?: 'hyped' | 'party' | 'emotional' | 'chill' | 'toxic';
  moderated_by_ai: boolean;
  created_at: string;
}

export interface Gift {
  id: string;
  from_user: string;
  to_artist_id: string;
  track_id?: string;
  event_id?: string;
  amount: number;
  gift_type?: string;
  message?: string;
  created_at: string;
}

export interface UserInteraction {
  id: string;
  user_name: string;
  artist_id: string;
  track_id: string;
  interaction_type: 'like' | 'follow' | 'play';
  created_at: string;
}