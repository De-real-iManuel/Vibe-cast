'use client'

import { useState, useEffect } from 'react'
import { Search, Mic, TrendingUp } from 'lucide-react'
import { Artist, Track } from '@/types/database'

export function SearchResults() {
  const [query, setQuery] = useState('')
  const [artists, setArtists] = useState<Artist[]>([])
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(false)

  const trendingSearches = ['Burna Boy', 'Afrobeats', 'Wizkid', 'Tems', 'Nigerian music']

  useEffect(() => {
    if (query.length > 2) {
      searchContent()
    } else {
      setArtists([])
      setTracks([])
    }
  }, [query])

  const searchContent = async () => {
    setLoading(true)
    try {
      // Mock search - in real app would call search API
      const [artistsRes, tracksRes] = await Promise.all([
        fetch('/api/artists'),
        fetch('/api/tracks')
      ])
      
      const artistsData = await artistsRes.json()
      const tracksData = await tracksRes.json()
      
      // Filter results based on query
      const filteredArtists = artistsData.artists?.filter((artist: Artist) =>
        artist.name.toLowerCase().includes(query.toLowerCase())
      ) || []
      
      const filteredTracks = tracksData.tracks?.filter((track: Track) =>
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.artist?.name.toLowerCase().includes(query.toLowerCase())
      ) || []
      
      setArtists(filteredArtists)
      setTracks(filteredTracks)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 pb-32">
      {/* Search Header */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artists, songs, or genres..."
            className="w-full bg-white/10 border border-white/20 rounded-full pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors">
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Trending Searches */}
      {!query && (
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold">Trending Searches</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((term, index) => (
              <button
                key={index}
                onClick={() => setQuery(term)}
                className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm hover:bg-purple-500/30 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {query && (
        <div className="space-y-6">
          {loading && (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-400 mt-2">Searching...</p>
            </div>
          )}

          {/* Artists */}
          {artists.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Artists</h3>
              <div className="space-y-3">
                {artists.map((artist, index) => (
                  <div key={artist.id} className="glass rounded-xl p-4 hover:neon-glow transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full`}></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-white">{artist.name}</h4>
                          {artist.verified && <span className="text-blue-400">✓</span>}
                          {artist.is_live && (
                            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">LIVE</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{artist.followers_count.toLocaleString()} followers</p>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-full text-sm font-medium transition-colors">
                        Follow
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tracks */}
          {tracks.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Songs</h3>
              <div className="space-y-3">
                {tracks.map((track, index) => (
                  <div key={track.id} className="glass rounded-xl p-4 hover:neon-glow transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg`}></div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{track.title}</h4>
                        <p className="text-sm text-gray-400">{track.artist?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-400">{(track.play_count / 1000000).toFixed(1)}M plays</p>
                        <p className="text-xs text-gray-500">{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {!loading && query && artists.length === 0 && tracks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">No results found</h3>
              <p className="text-gray-400">Try searching for something else</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}