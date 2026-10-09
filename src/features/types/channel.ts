import { ChannelStream } from "./channel-stream";
import { VideoChannel } from "./video-channel";

export interface Channel {
  id: string;
  slug: string;
  name: string;
  nameJapanese: string | null;
  description: string | null;
  imageUrl: string | null;
  largeImageUrl: string | null;
  youtubeUrl: string | null;
  twitchUrl: string | null;
  xUrl: string | null;

  videos?: VideoChannel[];
  channelStreams?: ChannelStream[];
}

export interface ChannelDetailResponse {
  message: string;
  data: Channel;
}