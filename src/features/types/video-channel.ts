import { Channel } from "./channel";
import { Video } from "./video";

export interface VideoChannel {
  videoId: string;
  channelId: string;

  video?: Video;
  channel?: Channel;
}
