import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { MalAnimeSearchResponse } from "../types/mal-anime";

interface GetMalAnimesQuery {
  q: string;
  page?: number;
  take?: number;
}

const useGetMalAnimes = (queries: GetMalAnimesQuery) => {
  return useQuery({
    queryKey: ["mal-anime", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<MalAnimeSearchResponse>(
        "/api/mal-anime/search",
        { params: queries },
      );
      return data;
    },
    enabled: !!queries.q.trim(),
  });
};

export default useGetMalAnimes;
