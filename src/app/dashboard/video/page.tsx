import type { Metadata } from "next";
import VideoPage from "./video-page";

export const metadata: Metadata = {
  title: "Video",
};

export default function Page() {
  return <VideoPage />;
}