"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuthStore } from "@/stores/auth";
import { getTokenExpiration } from "@/lib/auth-token";

export function useAuthExpiration() {
  const router = useRouter();

  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);


  useEffect(() => {
    if (!token) {
      return;
    }

    const expiration = getTokenExpiration(token);

    if (!expiration) {
      logout();
      router.replace("/login");
      return;
    }

    const remainingTime = expiration - Date.now();

    if (remainingTime <= 0) {
      logout();
      router.replace("/login");
      return;
    }

    const timeout = window.setTimeout(() => {
      logout();

      toast.info("Your session has expired. Please log in again.", {duration: 10000});

      router.replace("/login");
    }, remainingTime);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [token, logout, router]);
}