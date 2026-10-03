"use client";

import { Button } from "@/components/ui/button";
import useGetMalAnimeByMalId from "@/features/hooks/use-get-mal-anime-by-mal-id";
import useImportMalAnime from "@/features/hooks/use-import-mal-anime";

interface MalAnimeDetailPageProps {
  malId: string;
}

export default function MalAnimeDetailPage({
  malId,
}: MalAnimeDetailPageProps) {
  const {
    data: anime,
    isLoading,
    isError,
  } = useGetMalAnimeByMalId(malId);

  const importMalAnime = useImportMalAnime();

  const handleImport = () => {
    if (!anime) {
      return;
    }

    importMalAnime.mutate(anime.mal_id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load anime.</div>;
  }

  if (!anime) {
    return <div>Anime not found.</div>;
  }

  return (
    <main>
      <section>
        <div>
          {anime.main_picture?.large && (
            <img
              src={anime.main_picture.large}
              alt={anime.title}
            />
          )}
        </div>

        <div>
          <h1>{anime.title}</h1>

          {anime.alternative_titles?.en && (
            <p>{anime.alternative_titles.en}</p>
          )}

          <p>
            Score: {anime.mean ?? "N/A"}
          </p>

          <p>
            Episodes: {anime.num_episodes ?? "N/A"}
          </p>

          <p>
            Status: {anime.status ?? "N/A"}
          </p>

          <p>
            Type: {anime.media_type ?? "N/A"}
          </p>
        </div>
      </section>

      <section>
        <h2>Synopsis</h2>

        <p>
          {anime.synopsis ?? "No synopsis available."}
        </p>
      </section>

      <section>
        <h2>Genres</h2>

        <div>
          {anime.genres?.length ? (
            anime.genres.map((genre) => (
              <span key={genre.id}>
                {genre.name}
              </span>
            ))
          ) : (
            <span>No genres available.</span>
          )}
        </div>
      </section>

      <section>
        <h2>Information</h2>

        <p>
          Start date: {anime.start_date ?? "N/A"}
        </p>

        <p>
          End date: {anime.end_date ?? "N/A"}
        </p>

        <p>
          Studio:{" "}
          {anime.studios?.length
            ? anime.studios
                .map((studio) => studio.name)
                .join(", ")
            : "N/A"}
        </p>
      </section>

      <Button
        type="button"
        onClick={handleImport}
        disabled={
          importMalAnime.isPending ||
          anime.is_imported
        }
      >
        {importMalAnime.isPending
          ? "Importing..."
          : anime.is_imported
            ? "Imported"
            : "Import Anime"}
      </Button>
    </main>
  );
}