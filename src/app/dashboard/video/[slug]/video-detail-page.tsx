"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import EditVideoChannelsDialog from "@/features/components/edit-video-channels-dialog";
import VideoChannelList from "@/features/components/video-channel-list";
import useGetVideoBySlug from "@/features/hooks/use-get-video-by-slug";
import { isAxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VideoDetailPageProps {
  slug: string;
}

export default function VideoDetailPage({ slug }: VideoDetailPageProps) {
  const { data: video, isLoading, isError, error } = useGetVideoBySlug(slug);

  if (isLoading)
    return (
      <div className="flex items-center justify-center gap-2">
        <div className="loading loading-spinner text-primary"></div>
        <div>Loading data...</div>
      </div>
    );
  if (isError) {
    let errorMessage = "Something went wrong";
    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else {
      errorMessage = (error as Error).message;
    }
    return <div className="text-destructive">Error: {errorMessage}</div>;
  }
  if (!video) return <div>No video found</div>;

  return (
    <div className="container mx-auto flex flex-col gap-5 p-4">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-3/12 flex-col gap-3">
          <div className="relative h-110 w-full overflow-hidden md:h-130">
            <Image
              src={video.imageUrl ?? "/images/default-thumbnail.png"}
              alt={video.title ?? "video-thumbnail"}
              className="object-fill"
              loading="eager"
              sizes="(max-width: 500px) 100vw, 500px"
              fill
            />
          </div>
        </div>

        <div className="flex flex-9/12 flex-col justify-between gap-3">
          <div className="flex flex-col gap-3">
            <div className="bg-secondary flex flex-col px-2 py-1">
              <div className="text-3xl font-bold">{video.title}</div>
              <div className="text-muted-foreground text-xl">
                {video.titleEnglish}
              </div>
            </div>
            <div className="border-b-2 text-lg font-bold">Synopsis</div>
            <div>{video.synopsis ?? "No synopsis"}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b-2 py-1">
              <div className="text-lg font-bold">
                Channels that have watched
              </div>
              <EditVideoChannelsDialog
                slug={slug}
                initialChannelIds={
                  video.channels
                    ?.map(({ channel }) => channel?.id)
                    .filter((id): id is string => Boolean(id)) ?? []
                }
              />
            </div>
            <ScrollArea className="max-h-45 pt-2 **:**:data-[slot=scroll-area-scrollbar]:hidden">
              <VideoChannelList channels={video.channels} />
            </ScrollArea>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-3/12 flex-col gap-3">
          <div className="bg-card flex flex-col gap-3 border px-4 py-3">
            <div className="flex flex-col gap-3">
              <div className="border-b-2 text-lg font-bold">
                Alternative Titles
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <div>Japanese : {video.titleJapanese}</div>
                <div>English : {video.titleEnglish}</div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="border-b-2 text-lg font-bold">Information</div>
              <div className="flex flex-col gap-1 text-sm">
                <div>Type : {video.mediaType ?? "-"}</div>
                <div>Total Episodes : {video.totalEpisodes ?? "-"}</div>
                <div>status : {video.status ?? "-"}</div>
                <div>
                  {video.airedFrom || video.airedTo ? (
                    <>
                      Aired :{" "}
                      {video.airedFrom
                        ? format(new Date(video.airedFrom), "MMM d, yyyy")
                        : "-"}
                      {" to "}
                      {video.airedTo
                        ? format(new Date(video.airedTo), "MMM d, yyyy")
                        : "-"}
                    </>
                  ) : (
                    "Aired : -"
                  )}
                </div>
                <div>
                  Genre :{" "}
                  {video.genres && video.genres.length > 0
                    ? video.genres.map((genre) => genre.genre?.name).join(", ")
                    : "-"}
                </div>
                <div>Score : {video.score ?? "-"}</div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="border-b-2 text-lg font-bold">Playlist</div>
              <div>
                <div className="flex flex-col gap-2">
                  {video.playlist?.videos?.map((video) => (
                    <Link
                      key={video.id}
                      href={`/dashboard/video/${video.slug}`}
                      className="bg-secondary border px-3 py-2 hover:opacity-80"
                    >
                      {video.title}
                    </Link>
                  )) ?? <div className="text-sm">No playlist</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex min-w-0 flex-9/12 flex-col gap-3">
          <div className="border-b-2 text-lg font-bold">Stream Link</div>
          {video.episodes && video.episodes.length > 0 ? (
            <Tabs
              defaultValue={`episode-${video.episodes[0]?.channelStreamEpisodes[0]?.episode.episodeNumber}`}
              className="w-full"
            >
              <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent">
                {video.episodes.map((episode) => {
                  const episodeData = episode.channelStreamEpisodes[0]?.episode;

                  if (!episodeData) return null;

                  return (
                    <TabsTrigger
                      key={episodeData.id}
                      value={`episode-${episodeData.episodeNumber}`}
                      className="not-data-active:border-secondary data-active:bg-secondary h-8 w-22 shrink-0 rounded-none border-2 not-data-active:border-2"
                    >
                      Episode {episodeData.episodeNumber}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {video.episodes.map((episode) => {
                const episodeData = episode.channelStreamEpisodes[0]?.episode;

                if (!episodeData) return null;

                return (
                  <TabsContent
                    key={episodeData.id}
                    value={`episode-${episodeData.episodeNumber}`}
                    className="bg-card flex flex-col gap-3 border p-3"
                  >
                    {episode.channelStreamEpisodes.length > 0 ? (
                      episode.channelStreamEpisodes.map(
                        (channelStreamEpisode) => (
                          <div
                            key={`${channelStreamEpisode.episode.id}-${channelStreamEpisode.stream.id}`}
                          >
                            <div className="flex gap-3">
                              <div className="hover:bg-secondary flex w-full items-center gap-1 py-2 transition-opacity">
                                <div className="relative mx-3 my-1 size-10 shrink-0 overflow-hidden rounded-xl">
                                  <Image
                                    src={
                                      channelStreamEpisode.stream.channel
                                        .imageUrl ??
                                      "/images/channel-profile-default.jpg"
                                    }
                                    alt={
                                      channelStreamEpisode.stream.channel
                                        .name ?? "channel-avatar"
                                    }
                                    className="object-cover"
                                    width={50}
                                    height={50}
                                  />
                                </div>

                                <div className="flex h-full min-w-0 flex-1 flex-col justify-between">
                                  <div className="truncate text-lg">
                                    <Link
                                      href={channelStreamEpisode.stream.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {channelStreamEpisode.stream.title}
                                    </Link>
                                  </div>

                                  <div className="truncate text-xs">
                                    {channelStreamEpisode.stream.channel.name}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ),
                      )
                    ) : (
                      <div className="text-muted-foreground py-4 text-center">
                        No stream link available
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          ) : (
            <div className="text-muted-foreground bg-card border p-4 text-center">
              No stream link available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
