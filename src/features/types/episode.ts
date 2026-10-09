import { ChannelStreamEpisode } from "./channel-stream-episode";
import { Video } from "./video";

export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;

  video: Video;
  channelStreamEpisodes: ChannelStreamEpisode[];
}
