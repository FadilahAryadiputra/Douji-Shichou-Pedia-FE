import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp?: number;
}

export function getTokenExpiration(token: string): number | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    return decoded.exp ? decoded.exp * 1000 : null;
  } catch {
    return null;
  }
}