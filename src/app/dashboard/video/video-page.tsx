"use client";

import PaginationSection from "@/features/components/pagination-section";
import { Input } from "@/components/ui/input";
import VideoCardList from "@/features/components/video-card-list";
import VideoCardListSkeleton from "@/features/components/video-card-list-skeleton";
import useGetVideos from "@/features/hooks/use-get-videos";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";

const VideoPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);
  const [debounceSearch] = useDebounceValue(search, 1000);

  const { data: videos, isPending, isPlaceholderData, } = useGetVideos({
    page,
    take,
    search: debounceSearch,
  });

  return (
    <main className="p-4">
      <div className="flex justify-between">
        <div className="text-xl font-bold">Video List</div>
        <Input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 flex max-w-md"
        />
      </div>
      <div className="flex flex-col gap-4">
        {isPending && <VideoCardListSkeleton count={4} />}
        {videos?.data.map((video) => (
          <VideoCardList key={video.id} video={video} />
        ))}
      </div>
      {videos && (
        <div className="my-12">
          <PaginationSection
            page={videos.meta.page}
            take={videos.meta.take}
            totalPages={Math.ceil(videos.meta.total / videos.meta.take)}
            setPage={setPage}
            setTake={setTake}
          />
        </div>
      )}
    </main>
  );
};

export default VideoPage;
