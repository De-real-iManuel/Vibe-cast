# VibeCast - AI-Powered Live Music Events

An AI-powered live music event platform that uses Gemini 3's multimodal capabilities to analyze concerts and create intelligent recaps.

## 🚀 Features

### Core MVP Features
- **Multimodal Event Analysis** - Gemini 3 analyzes concert videos (audio + visual) to identify peak moments
- **Real-time Context Engine** - AI moderates chat and understands event sentiment in real-time
- **Live Streaming** - Powered by Agora.io for low-latency streaming
- **Smart Recaps** - Auto-generated highlights with timestamps and social media content

### Technical Highlights
- Next.js 14 with App Router
- Supabase for database, auth, and real-time features
- Gemini 3 API for multimodal AI analysis
- Agora.io for video streaming
- Tailwind CSS + shadcn/ui for modern UI

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- Supabase account
- Google AI Studio account (for Gemini API)
- Agora.io account

### 1. Clone and Install
```bash
git clone <repository-url>
cd Vibe-cast
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `GEMINI_API_KEY` - Google AI Studio API key
- `NEXT_PUBLIC_AGORA_APP_ID` - Agora.io App ID
- `AGORA_APP_CERTIFICATE` - Agora.io App Certificate

### 3. Database Setup
1. Create a new Supabase project
2. Run the SQL schema in `database/schema.sql` in your Supabase SQL editor
3. This will create all tables and sample data

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── events/            # Event pages
│   └── recap/             # Recap viewer
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── events/           # Event-related components
│   ├── streaming/        # Live streaming components
│   └── recap/            # Recap components
├── lib/                  # Utility libraries
│   ├── supabase.ts       # Supabase client
│   ├── gemini.ts         # Gemini AI integration
│   └── utils.ts          # Helper functions
├── types/                # TypeScript type definitions
└── database/             # Database schema
```

## 🤖 Gemini 3 Integration

### Feature 1: Multimodal Video Analysis
- Analyzes concert videos for audio and visual peaks
- Identifies crowd energy, lighting changes, and emotional moments
- Generates timestamped highlights with descriptions
- Creates energy graphs and sentiment timelines

### Feature 2: Real-time Chat Moderation
- Moderates chat messages in real-time
- Understands context and sentiment
- Flags inappropriate content while allowing music enthusiasm
- Provides sentiment analysis for each message

## 🎯 API Endpoints

### Events
- `GET /api/events` - List all events
- `POST /api/events` - Create new event
- `GET /api/events/[id]` - Get event details
- `POST /api/events/[id]/end` - End stream and trigger analysis

### Chat
- `POST /api/chat` - Send message (with AI moderation)
- `GET /api/chat?event_id=...` - Get event messages

### Gemini AI
- `POST /api/gemini/analyze-video` - Analyze video with Gemini 3
- `POST /api/chat/moderate` - Moderate single message

## 🎨 UI Components

### Event Components
- `EventGrid` - Grid of event cards
- `EventCard` - Individual event display
- `CreateEventForm` - Event creation form

### Streaming Components
- `LiveStream` - Main streaming interface
- `ChatBox` - Real-time chat with AI moderation

### Recap Components
- `RecapViewer` - AI-generated recap display
- Highlight cards with energy visualization
- Interactive timeline and sharing features

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Manual Deployment
```bash
npm run build
npm start
```

## 🎵 Demo Data

The database includes sample events:
- **The Midnight** - Upcoming synthwave session
- **Carpenter Brut** - Completed event with AI-generated recap

## 📱 Mobile Support

- Responsive design works on all devices
- Touch-optimized controls
- Mobile-friendly chat interface
- PWA-ready architecture

## 🔧 Development

### Adding New Features
1. Create components in appropriate directories
2. Add API routes in `app/api/`
3. Update types in `types/database.ts`
4. Test with sample data

### Database Changes
1. Update `database/schema.sql`
2. Run migrations in Supabase
3. Update TypeScript types

## 🎯 Hackathon Demo

### 3-Minute Demo Script
1. **Homepage** (30s) - Show AI-powered features
2. **Event Creation** (30s) - Create new event
3. **Live Stream** (60s) - Show streaming + AI chat moderation
4. **AI Analysis** (60s) - Demonstrate Gemini 3 video analysis
5. **Recap Viewer** (30s) - Show generated highlights and sharing

### Key Demo Points
- Emphasize Gemini 3 multimodal capabilities
- Show real-time AI moderation in action
- Highlight automatic recap generation
- Demonstrate mobile responsiveness

## 🏆 Success Metrics

- ✅ Functional demo showcasing both Gemini 3 features
- ✅ 3-minute demo video
- ✅ Public GitHub repository
- ✅ Working deployment (Vercel)
- ✅ Mobile-optimized experience
- ✅ Real-time features working

## 📄 License

MIT License - see LICENSE file for details.

---

Built for the Gemini 3 Hackathon 🚀