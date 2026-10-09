import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

interface VideoCardListSkeletonProps {
  count: number;
}

const VideoCardListSkeleton: FC<VideoCardListSkeletonProps> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex overflow-hidden rounded-lg border shadow-sm"
        >
          <Skeleton className="h-50 w-auto flex-3/12 rounded-none" />
          <div className="flex flex-9/12">
            <div className="flex w-full flex-col gap-2 px-4 py-2">
              <Skeleton className="h-10 w-full rounded-sm" />
              <Skeleton className="h-full w-full rounded-sm" />
            </div>
            <Skeleton className="h-full w-15 rounded-none" />
          </div>
        </div>
      ))}
    </>
  );
};

export default VideoCardListSkeleton;
