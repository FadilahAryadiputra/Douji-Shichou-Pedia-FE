import { VideoGenre } from "./video-genre";

export interface Genre {
  id: string;
  name: string;

  videos?: VideoGenre[];
}
