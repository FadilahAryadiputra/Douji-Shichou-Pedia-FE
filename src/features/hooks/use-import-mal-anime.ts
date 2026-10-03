import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import axiosInstance from "@/lib/axios";
import { MalAnime } from "../types/mal-anime";

export default function useImportMalAnime() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (malId: number) => {
      const response = await axiosInstance.post(
        `/api/mal-anime/import/${malId}`
      );

      return response.data;
    },

    onSuccess: (_, malId) => {
      toast.success("Anime imported successfully!");

      queryClient.setQueryData<MalAnime>(
        ["mal-anime", String(malId)],
        (oldData) => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData,
            is_imported: true,
          };
        }
      );
    },

    onError: (
      error: AxiosError<{ message: string }>
    ) => {
      toast.error(
        error.response?.data?.message ??
          "Failed to import anime!"
      );
    },
  });
}