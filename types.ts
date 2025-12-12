export interface AudioTrack {
  id: string;
  sender: string;
  src: string; // URL to audio file
}

export interface SongDetails {
  title: string;
  artist: string;
  rationale: string;
  embedUrl: string; // URL for iframe
}

export interface SectionProps {
  id?: string;
}
