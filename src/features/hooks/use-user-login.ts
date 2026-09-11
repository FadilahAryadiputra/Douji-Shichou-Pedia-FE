"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import type {
  UserLoginInput,
  UserLoginResponse,
} from "../schemas/user-login.schema";
import { User } from "../schemas/user.schema";

const STORAGE_LAST_USER_ID = "lastUserId";
const DEFAULT_AFTER_LOGIN = "/";

interface LoginErrorResponse {
  message: string;
}

function isSafeNext(next: string | null): boolean {
  if (!next) {
    return false;
  }

  try {
    const url = new URL(next, window.location.origin);

    if (url.origin !== window.location.origin) {
      return false;
    }

    if (
      url.pathname.startsWith("/login") ||
      url.pathname.startsWith("/unauthorized")
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

function getUserDestination(role: User["role"]): string {
  switch (role) {
    case "ADMIN":
      return "/admin";

    case "USER":
      return "/dashboard";

    default:
      return DEFAULT_AFTER_LOGIN;
  }
}

const useUserLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const onUserAuthSuccess = useAuthStore((state) => state.onUserAuthSuccess);

  const next = useMemo(() => {
    const value = searchParams.get("next");

    if (!value) {
      return null;
    }

    return value.startsWith("/") ? value : null;
  }, [searchParams]);

  const loginMutation = useMutation<
    UserLoginResponse,
    AxiosError<LoginErrorResponse>,
    UserLoginInput
  >({
    mutationFn: async (payload: UserLoginInput) => {
      const { data } = await axiosInstance.post<UserLoginResponse>(
        "/api/auth/login",
        payload,
        {
          skipAuth: true,
          skipRedirect401: true,
        },
      );

      return data;
    },

    onSuccess: async ({ data }) => {
      const { token, payload: user } = data;

      let destination = getUserDestination(user.role);

      let isSameUser = false;

      try {
        const previousUserId =
          window.localStorage.getItem(STORAGE_LAST_USER_ID);

        isSameUser = !!previousUserId && previousUserId === user.id;

        if (isSameUser && isSafeNext(next)) {
          destination = next!;
        }

        onUserAuthSuccess({
          token,
          user,
        });

        window.localStorage.setItem(STORAGE_LAST_USER_ID, user.id);
      } catch {
        // Ignore localStorage errors
      }

      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      toast.success(isSameUser ? "Welcome back!" : "Login successful!");
      router.replace(destination);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Login failed");
    },
  });

  return {
    loginMutation,
  };
};

export default useUserLogin;
