-- VibeStream Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Artists table
CREATE TABLE artists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  cover_image_url TEXT,
  verified BOOLEAN DEFAULT false,
  followers_count INTEGER DEFAULT 0,
  total_earnings INTEGER DEFAULT 0, -- in kobo (NGN cents)
  is_live BOOLEAN DEFAULT false,
  live_viewers INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tracks table
CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  album TEXT,
  duration INTEGER NOT NULL, -- in seconds
  audio_url TEXT,
  cover_image_url TEXT,
  lyrics JSONB, -- Array of {time: number, text: string}
  play_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  total_tips INTEGER DEFAULT 0, -- in kobo
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Live events table
CREATE TABLE live_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_time TIMESTAMP WITH TIME ZONE,
  venue TEXT,
  is_virtual BOOLEAN DEFAULT true,
  status TEXT CHECK (status IN ('upcoming', 'live', 'ended')) DEFAULT 'upcoming',
  stream_url TEXT,
  viewer_count INTEGER DEFAULT 0,
  total_gifts INTEGER DEFAULT 0, -- in kobo
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages for live events
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES live_events(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  message TEXT NOT NULL,
  sentiment TEXT CHECK (sentiment IN ('positive', 'excited', 'neutral', 'negative', 'toxic')),
  vibe TEXT CHECK (vibe IN ('hyped', 'party', 'emotional', 'chill', 'toxic')),
  moderated_by_ai BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gifts/Tips table
CREATE TABLE gifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user TEXT NOT NULL,
  to_artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  track_id UUID REFERENCES tracks(id) ON DELETE SET NULL,
  event_id UUID REFERENCES live_events(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL, -- in kobo
  gift_type TEXT, -- emoji or gift name
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User interactions (likes, follows)
CREATE TABLE user_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name TEXT NOT NULL,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
  interaction_type TEXT CHECK (interaction_type IN ('like', 'follow', 'play')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_tracks_artist ON tracks(artist_id);
CREATE INDEX idx_events_artist ON live_events(artist_id);
CREATE INDEX idx_chat_event ON chat_messages(event_id);
CREATE INDEX idx_gifts_artist ON gifts(to_artist_id);
CREATE INDEX idx_interactions_artist ON user_interactions(artist_id);

-- Enable Row Level Security
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access for artists" ON artists FOR SELECT USING (true);
CREATE POLICY "Public read access for tracks" ON tracks FOR SELECT USING (true);
CREATE POLICY "Public read access for live events" ON live_events FOR SELECT USING (true);
CREATE POLICY "Public read access for chat messages" ON chat_messages FOR SELECT USING (true);
CREATE POLICY "Public read access for gifts" ON gifts FOR SELECT USING (true);
CREATE POLICY "Public read access for interactions" ON user_interactions FOR SELECT USING (true);

CREATE POLICY "Allow insert chat messages" ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert gifts" ON gifts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert interactions" ON user_interactions FOR INSERT WITH CHECK (true);

-- Sample data
INSERT INTO artists (name, username, email, bio, verified, followers_count, is_live, live_viewers) VALUES 
('Burna Boy', 'burnaboy', 'burna@vibestream.com', 'African Giant 🦍 Grammy Winner 🏆 Spreading Afrobeats to the world 🌍', true, 2100000, true, 12547),
('Wizkid', 'wizkid', 'wiz@vibestream.com', 'Starboy ⭐ Made in Lagos 🇳🇬 Big Wiz Energy', true, 3200000, false, 0),
('Davido', 'davido', 'davido@vibestream.com', 'OBO 👑 30BG 🔥 Timeless Music', true, 2800000, false, 0),
('Tems', 'tems', 'tems@vibestream.com', 'For Broken Ears 🎵 Grammy Winner 🏆', true, 1500000, true, 3200),
('Rema', 'rema', 'rema@vibestream.com', 'Rave & Roses 🌹 Mavin Records', true, 1800000, true, 5800);

INSERT INTO tracks (artist_id, title, album, duration, play_count, like_count, total_tips, lyrics) VALUES 
((SELECT id FROM artists WHERE username = 'burnaboy'), 'Last Last', 'Love, Damini', 225, 2100000, 450000, 1542000, 
'[
  {"time": 0, "text": "Show me love, oh"},
  {"time": 15, "text": "I no go give you love for free"},
  {"time": 30, "text": "You go pay me with your heart, oh"},
  {"time": 45, "text": "Last last, na everybody go chop breakfast"},
  {"time": 60, "text": "Last last, na everybody go chop breakfast"},
  {"time": 90, "text": "Show me love, show me love"},
  {"time": 105, "text": "I no go give you love for free"},
  {"time": 120, "text": "You go pay me with your heart"}
]'::jsonb),
((SELECT id FROM artists WHERE username = 'rema'), 'Calm Down', 'Rave & Roses', 239, 5800000, 1200000, 2300000, 
'[
  {"time": 0, "text": "Baby, calm down, calm down"},
  {"time": 20, "text": "Girl, you make my heartbeat sound"},
  {"time": 40, "text": "Like a symphony"},
  {"time": 60, "text": "Baby, calm down, calm down"}
]'::jsonb),
((SELECT id FROM artists WHERE username = 'tems'), 'Free Mind', 'If Orange Was A Place', 198, 1900000, 380000, 950000,
'[
  {"time": 0, "text": "As I ripen, my mind is getting open"},
  {"time": 25, "text": "I am not broken, I am chosen"},
  {"time": 50, "text": "Free mind, free mind"},
  {"time": 75, "text": "Put my heart on the line"}
]'::jsonb);

INSERT INTO live_events (artist_id, title, description, scheduled_time, venue, status, viewer_count, total_gifts) VALUES 
((SELECT id FROM artists WHERE username = 'burnaboy'), 'African Giant Live', 'Live performance of hits from Love, Damini album', NOW() + INTERVAL '2 hours', 'Virtual Concert', 'live', 12547, 850000),
((SELECT id FROM artists WHERE username = 'tems'), 'If Orange Was A Place Live', 'Intimate acoustic session', NOW() + INTERVAL '1 hour', 'Virtual Studio', 'live', 3200, 420000),
((SELECT id FROM artists WHERE username = 'rema'), 'Rave & Roses Tour', 'High energy Afrobeats concert', NOW() + INTERVAL '1 day', 'Lagos, Nigeria', 'upcoming', 0, 0);

-- Sample chat messages
INSERT INTO chat_messages (event_id, user_name, message, sentiment, vibe, moderated_by_ai) VALUES 
((SELECT id FROM live_events WHERE title = 'African Giant Live'), 'NaijaVibes', 'Burna Boy is on fire! 🔥🔥🔥', 'excited', 'hyped', true),
((SELECT id FROM live_events WHERE title = 'African Giant Live'), 'AfrobeatsFan', 'This beat is insane!', 'positive', 'party', true),
((SELECT id FROM live_events WHERE title = 'African Giant Live'), 'LagosLive', '❤️❤️❤️ Love from Lagos!', 'positive', 'emotional', true),
((SELECT id FROM live_events WHERE title = 'African Giant Live'), 'MusicLover23', 'Can''t stop dancing! 💃🕺', 'excited', 'party', true),
((SELECT id FROM live_events WHERE title = 'African Giant Live'), 'VibeKing', 'LAST LAST IS MY ANTHEM!', 'excited', 'hyped', true);