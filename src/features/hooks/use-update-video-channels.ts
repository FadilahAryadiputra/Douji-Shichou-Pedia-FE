"use client";

import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface UpdateVideoChannelsPayload {
  slug: string;
  channelIds: string[];
}

export default function useUpdateVideoChannels() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      slug,
      channelIds,
    }: UpdateVideoChannelsPayload) => {
      const response = await axiosInstance.put(
        `/api/video/${slug}/update-video-channels`,
        { channelIds },
      );

      return response.data;
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["video", variables.slug],
      });
      toast.success("Channels updated successfully!");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message ?? "Failed to update channels!");
    },
  });
}