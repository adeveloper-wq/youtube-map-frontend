// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type Video = {
  video_id: string,
  video_titel: string,
  /* video_description: string, */
  video_published_at: string,
  video_category_id: string,
  video_default_language: string,
  video_default_audio_language: string,
  video_topics: Array<YoutubeTopic>,
  video_location: Location,
  made_for_kids: boolean,
}

export type YoutubeTopic = {
  topic_id: string,
  topic_url: string,
}

export type Location = {
  latitude: string,
  longitude: string,
  description: string,
}

export type Channel = {
  channel_id: string,
  channel_name: string,
  channel_description: string,
  channel_profil_image: string,
  channel_banner_image: string,
  channel_country: string,
  channel_uploads_playlist_id: string,
  channel_subscriber_count: number,
  channel_topics: Array<YoutubeTopic>,
  channel_keywords: string,
  channel_trailer: string,
  made_for_kids: boolean,
  status: string,
  channel_videos: Array<Video>,
  map_marker_hex_color: string,
  last_updated: Date,
  video_count: number,
  channel_custom_url: string,
  videos_with_locations_count: number
}