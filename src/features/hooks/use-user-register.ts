"use client";

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { axiosInstance } from "@/lib/axios";
import { UserRegisterInput } from "../schemas/user-register.schema";


interface RegisterResponse {
  message: string;
}

interface RegisterErrorResponse {
  message: string;
}

const useUserRegister = () => {
  const router = useRouter();

  const registerMutation = useMutation<
    RegisterResponse,
    AxiosError<RegisterErrorResponse>,
    UserRegisterInput
  >({
    mutationFn: async (
      payload: UserRegisterInput
    ) => {
      const {
        confirmPassword,
        ...registerPayload
      } = payload;

      const { data } =
        await axiosInstance.post<RegisterResponse>(
          "/api/auth/register",
          registerPayload,
          {
            skipAuth: true,
            skipRedirect401: true,
          }
        );

      return data;
    },

    onSuccess: () => {
      toast.success(
        "Register account success!"
      );

      router.replace("/login");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ??
          "Register account failed!"
      );
    },
  });

  return {
    registerMutation,
  };
};

export default useUserRegister;