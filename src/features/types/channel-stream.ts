import { Channel } from "./channel";
import { ChannelStreamEpisode } from "./channel-stream-episode";

export interface ChannelStream {
  id: string;
  channelId: string;
  link: string;
  title: string;

  channel: Channel;
  channelStreamEpisodes: ChannelStreamEpisode[];
}
