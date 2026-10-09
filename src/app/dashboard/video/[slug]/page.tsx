import type { Metadata } from "next";
import axiosInstance from "@/lib/axios";
import { VideoDetailResponse } from "@/features/types/video";
import VideoDetailPage from "./video-detail-page";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { data } = await axiosInstance.get<VideoDetailResponse>(
      `/api/video/${slug}`,
      {
        skipAuth: true,
        skipRedirect401: true,
      },
    );

    const video = data.data;

    return {
      title: video.title
        ? `${video.title}`
        : "Video",
    };
  } catch {
    return {
      title: "Video",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <VideoDetailPage slug={slug} />;
}