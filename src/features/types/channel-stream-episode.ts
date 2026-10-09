import { ChannelStream } from "./channel-stream";
import { Episode } from "./episode";

export interface ChannelStreamEpisode {
  streamid: string;
  episodeid: string;

  stream: ChannelStream;
  episode: Episode;
}
