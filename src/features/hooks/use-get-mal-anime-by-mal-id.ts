import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { MalAnime } from "../types/mal-anime";

const useGetMalAnimeByMalId = (malId: string) => {
  return useQuery({
    queryKey: ["mal-anime", malId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<MalAnime>(
        `/api/mal-anime/${malId}`,
      );
      return data;
    },
    enabled: !!malId,
  });
};

export default useGetMalAnimeByMalId;
