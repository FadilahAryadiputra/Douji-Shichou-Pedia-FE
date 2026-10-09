import Image from "next/image";
import { VideoChannel } from "../types/video-channel";
import { cn } from "@/lib/utils";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from "next/link";

interface VideoChannelListProps {
  channels?: VideoChannel[];
  className?: string;
}

export default function VideoChannelList({
  channels,
  className,
}: VideoChannelListProps) {
  if (!channels?.length) {
    return (
      <div className="text-muted-foreground py-2 text-sm">
        No channels have watched this video yet.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5",
        className,
      )}
    >
      {channels.map(({ channel }) =>
        channel ? (
          <HoverCard key={channel.id}>
            <HoverCardTrigger delay={500} closeDelay={0}>
              <div className="flex flex-col">
                <div className="hover:bg-secondary flex items-center gap-1 transition-opacity">
                  <div className="relative mx-3 my-1 size-10 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={
                        channel.imageUrl ?? "/images/channel-profile-default.jpg"
                      }
                      alt={channel.name ?? "channel-avatar"}
                      className="object-cover"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="min-w-0 flex-1 truncate">{channel.name}</div>
                </div>
                <div className="relative flex w-full items-center">
                  <div className="grow border-t border-gray-100 opacity-40" />
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-auto h-auto">
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="relative size-60 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={
                      channel.largeImageUrl ?? "/images/channel-profile-default.jpg"
                    }
                    alt={channel.name ?? "channel-avatar"}
                    className="object-contain"
                    sizes="240px"
                    fill
                  />
                </div>
                <Link href={`/dashboard/channel/${channel.slug}`} className="text-center font-bold">{channel.name}</Link>
              </div>
            </HoverCardContent>
          </HoverCard>
        ) : null,
      )}
    </div>
  );
}
