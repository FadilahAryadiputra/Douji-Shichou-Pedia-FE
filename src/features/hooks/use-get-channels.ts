import axiosInstance from "@/lib/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  PageableResponse,
  PaginationQueries,
} from "../schemas/pagination.schema";
import { Channel } from "../types/channel";

interface GetChannelsQuery extends PaginationQueries {
  search?: string;
}

const useGetChannels = (queries?: GetChannelsQuery) => {
  return useQuery({
    queryKey: ["channel", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Channel>>(
        "/api/channel",
        { params: queries },
      );
      return data;
    },
    placeholderData: keepPreviousData,
  });
};

export default useGetChannels;
