import type { Metadata } from "next";
import MalAnimePage from "./mal-anime-page";

export const metadata: Metadata = {
  title: "Import MAL",
};

export default function Page() {
  return <MalAnimePage />;
}