import { Genre } from "./genre";
import { Video } from "./video";

export interface VideoGenre {
  videoId: string;
  genreId: string;

  video?: Video;
  genre?: Genre;
}
