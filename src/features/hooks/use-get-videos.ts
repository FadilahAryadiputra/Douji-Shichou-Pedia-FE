import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  PageableResponse,
  PaginationQueries,
} from "../schemas/pagination.schema";
import axiosInstance from "@/lib/axios";
import { Video } from "../types/video";

interface GetVideosQuery extends PaginationQueries {
  search?: string;
  genre?: string;
}

const useGetVideos = (queries?: GetVideosQuery) => {
  return useQuery({
    queryKey: ["video", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Video>>(
        "/api/video",
        { params: queries },
      );
      return data;
    },
    placeholderData: keepPreviousData,
  });
};

export default useGetVideos;
