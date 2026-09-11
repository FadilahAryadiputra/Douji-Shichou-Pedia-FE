"use client";

import { useAuthExpiration } from "@/features/hooks/use-auth-expiration";

export function AuthExpirationProvider() {
  useAuthExpiration();

  return null;
}