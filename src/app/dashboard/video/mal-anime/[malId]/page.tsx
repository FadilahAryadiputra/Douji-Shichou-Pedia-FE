import type { Metadata } from "next";
import axiosInstance from "@/lib/axios";
import MalAnimeDetailPage from "./mal-anime-detail-page";

interface PageProps {
  params: Promise<{
    malId: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { malId } = await params;

  try {
    const { data: anime } = await axiosInstance.get(
      `/api/mal-anime/${malId}`,
      {
        skipAuth: true,
        skipRedirect401: true,
      },
    );

    return {
      title: anime?.title
        ? `${anime.title}`
        : "Mal Anime",
    };
  } catch {
    return {
      title: "Mal Anime",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { malId } = await params;

  return <MalAnimeDetailPage malId={malId} />;
}