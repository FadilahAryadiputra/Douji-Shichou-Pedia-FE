import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Video } from "../types/video";
import VideoChannelList from "./video-channel-list";

interface VideoCardListProps {
  video: Video;
}

const VideoCardList: FC<VideoCardListProps> = ({ video }) => {
  return (
    <>
      <div className="flex h-50 rounded-md border border-gray-300 overflow-hidden">
        <Link href={`/dashboard/video/${video.slug}`} className="relative h-auto w-full flex-3/12 overflow-hidden">
          <Image
            src={video.imageUrl ?? "/images/default-thumbnail.png"}
            alt={video.title ?? "event-thumbnail"}
            className="object-cover transition-opacity hover:opacity-80"
            sizes="(max-width: 500px) 100vw, 500px"
            loading="eager"
            fill
          />
        </Link>
        <div className="flex h-full flex-9/12">
          <div className="flex flex-col px-4 py-2 w-full">
            <div className="truncate font-bold">
              <Link href={`/dashboard/video/${video.slug}`}>
                {video.title}
              </Link>
            </div>
            <div className="relative flex w-full items-center">
              <div className="grow border-t border-gray-300"></div>
            </div>
            <ScrollArea className="max-h-39 pt-2 **:**:data-[slot=scroll-area-scrollbar]:hidden">
              <VideoChannelList channels={video.channels} />
            </ScrollArea>
          </div>
          <div className="flex flex-col justify-center gap-2 p-4 border-l">
            <ChevronRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCardList;
