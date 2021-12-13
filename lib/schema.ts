const schema: string = `
type Track {
  id: String
  album(full: Int): Album
  artists(full: Int, throttle: Int): [Artist]
  available_markets: [String]
  audio_features: AudioFeatures
  audio_analysis: AudioAnalysis
  disc_number: Int
  duration_ms: Int
  explicit: Boolean
  href: String
  is_playable: Boolean
  name: String
  popularity: Int
  preview_url: String
  track_number: Int
  type: String
  uri: String
}

type Artist {
  id: String
  genres: [Genre]
  href: String
  name: String
  popularity: Int
  type: String
  uri: String
  images: [Image]
  top_tracks(country: String): [Track]
  albums(album_type: String, throttle: Int, continueOnError: Int, limit: Int): [Album]
  related_artists(throttle: Int, continueOnError: Int, limit: Int): [Artist]
}

type Genre {
  genre: String
}

type SimplifiedArtist {
  id: String
  href: String
  name: String
  type: String
  uri: String
}

type Album {
  id: String
  album_type: String
  artists: [Artist]
  available_markets: [String]
  genres: [Genre]
  href: String
  label: String
  name: String
  popularity: Int
  release_date: String
  release_date_precision: String
  type: String
  uri: String
  images: [Image]
  tracks(throttle: Int, continueOnError: Int, limit: Int): [Track]
}

type SimplifiedAlbum {
  id: String
  album_type: String
  artists: [Artist]
  available_markets: [String]
  href: String
  label: String
  name: String
  type: String
  uri: String
}

type PrivateUser {
  id: String
  birthday: String
  country: String
  display_name: String
  email: String
  href: String
  product: String
  uri: String
  tracks(throttle: Int, continueOnError: Int, limit: Int): [SavedTrack]
  playlists(throttle: Int, continueOnError: Int, limit: Int): [Playlist]
  albums: [SavedAlbum]
  top_artists(throttle: Int, continueOnError: Int, limit: Int): [Artist]
  top_tracks(throttle: Int, continueOnError: Int, limit: Int): [Track]
  images: [Image]
  artists(throttle: Int, continueOnError: Int, limit: Int): [Artist]
  devices: [Device]
  player: Player
}

type SavedTrack {
  added_at: String
  track: Track
}

type SavedAlbum {
  added_at: String
  album: Album
}

type PlaylistTrack {
  added_at: String
  track: Track
  added_by: PublicUser
  is_local: Boolean
}

type PublicUser {
  id: String
  display_name: String
  href: String
  uri: String
  playlists: [Playlist]
  images: [Image]
}

type Playlist {
  id: String
  description: String
  href: String
  name: String
  owner: PublicUser
  uri: String
  tracks(throttle: Int, continueOnError: Int, limit: Int): [PlaylistTrack]
  public: Boolean
  images: [Image]
}

type AudioFeatures {
  id: String
  acousticness: String
  analysis_url: String
  danceability: String
  duration_ms: String
  energy: String
  instrumentalness: String
  key: String
  liveness: String
  loudness: String
  mode: String
  speechiness: String
  tempo: String
  time_signature: String
  track_href: String
  valence: String
}

type AudioAnalysis {
  meta: Meta
  track: AudioAnalysisTrack
  bars: [Bar]
  beats: [Beat]
  sections: [Section]
  segments: [Segment]
  tatums: [Tatum]
}

type Meta {
  analyzer_version: String
  platform: String
  detailed_status: String
  status_code: Int
  timestamp: Int
  analysis_time: Float
  input_process: String
}

type AudioAnalysisTrack {
  num_samples: Int
  duration: Float
  sample_md5: String
  offset_seconds: Int
  window_seconds: Int
  analysis_sample_rate: Int
  analysis_channels: Int
  end_of_fade_in: Int
  start_of_fade_out: Float
  loudness: Float
  tempo: Float
  tempo_confidence: Float
  time_signature: Int
  time_signature_confidence: Float
  key: Int
  key_confidence: Float
  mode: Int
  mode_confidence: Float
  codestring: String
  code_version: Float
  echoprintstring: String
  echoprint_version: Float
  synchstring: String
  synch_version: Int
  rhythmstring: String
  rhythm_version: Int
}

type Bar {
  start: Float
  duration: Float
  confidence: Float
}

type Beat {
  start: Float
  duration: Float
  confidence: Float
}

type Section {
  start: Float,
  duration: Float
  confidence: Float
  loudness: Float
  tempo: Float
  tempo_confidence: Float
  key: Int
  key_confidence: Float
  mode: Int
  mode_confidence: Float
  time_signature: Int
  time_signature_confidence: Float
}

type Segment {
  start: Float
  duration: Float
  confidence: Float
  loudness_start: Float
  loudness_max: Float
  loudness_max_time: Float
  loudness_end: Float
  pitches: [Float]
  timbre: [Float]
}

type Tatum {
  start: Float
  duration: Float
  confidence: Float
}

type Image {
  height: Int
  url: String
  width: Int
}

type Device {
  id: String
  is_active: Boolean
  is_restricted: Boolean
  name: String
  type: String
  volume_percent: Int
}

type PlayerContext {
  href: String
  type: String
  uri: String
}

type Player {
  timestamp: String
  device: Device
  progress_ms: String
  is_playing: Boolean
  shuffle_state: Boolean
  repeat_state: String
  item: Track
  context: PlayerContext
}

# the schema allows the following query:
type Query {
  me: PrivateUser
  user(id: String!): PublicUser
  track(id: String, name: String): Track
  tracks(ids: String!): [Track]
  audio_features(trackIds: String!): [AudioFeatures]
  audio_feature(trackId: String!): AudioFeatures
  audio_analysis(trackId: String!): AudioAnalysis
  artist(id: String, name: String): Artist
  artists(ids: String!): [Artist]
  album(id: String!): Album
  albums(ids: String!): [Album]
  playlist(id: String!, userId: String!): Playlist
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
}
`;

export default schema;