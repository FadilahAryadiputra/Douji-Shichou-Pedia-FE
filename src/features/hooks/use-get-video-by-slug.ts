import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { VideoDetailResponse } from "../types/video";

const useGetVideoBySlug = (slug?: string) => {
  return useQuery({
    queryKey: ["video", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<VideoDetailResponse>(
        `/api/video/${slug}`
      );
      return data.data;
    },
    enabled: !!slug
  });
};

export default useGetVideoBySlug;