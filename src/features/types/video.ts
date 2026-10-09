import { Episode } from "./episode";
import { Playlist } from "./playlist";
import { VideoChannel } from "./video-channel";
import { VideoGenre } from "./video-genre";

export interface Video {
  id: string;
  slug: string;
  title: string;
  playlistWatchOrder: number;

  malId: number;
  titleEnglish: string;
  titleJapanese: string;
  synopsis: string;
  imageUrl: string;
  largeImageUrl: string;
  airedFrom: string;
  airedTo: string;
  score: string;
  status: string;
  totalEpisodes: number;
  mediaType: string;

  playlist?: Playlist;
  episodes?: Episode[];
  genres?: VideoGenre[];
  channels?: VideoChannel[];
}

export interface VideoDetailResponse {
  message: string;
  data: Video;
}
