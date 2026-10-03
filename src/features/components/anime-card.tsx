import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { MalAnime } from "../types/mal-anime";
import { Badge } from "@/components/ui/badge";

interface AnimeCardProps {
  anime: MalAnime;
}

const AnimeCard: FC<AnimeCardProps> = ({ anime }) => {
  return (
    <div className="border-secondary bg-card flex h-auto flex-col overflow-hidden rounded-md border">
      <Link href={`/dashboard/video/mal-anime/${anime.mal_id}`}>
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            src={
              anime.main_picture?.large ??
              "/images/default-thumbnail.png"
            }
            alt={anime.title ?? "anime-thumbnail"}
            className="object-cover"
            sizes="(max-width: 500px) 100vw, 500px"
            fill
          />
        </div>
      </Link>

      <div className="flex h-full flex-col justify-between gap-2 px-4 py-2">
        <div>
          <div className="truncate font-bold">
            {anime.title}
          </div>

          <div className="flex min-h-6 flex-wrap gap-1">
            {anime.genres?.length
              ? anime.genres.map((genre) => (
                  <Badge key={genre.id}>
                    {genre.name}
                  </Badge>
                ))
              : null}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative flex w-full items-center">
            <div className="grow border-t border-gray-300" />
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              {anime.media_type?.toUpperCase() ?? "Unknown"}
            </span>

            <span>
              {anime.mean !== undefined
                ? `⭐ ${anime.mean}`
                : "No score"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;