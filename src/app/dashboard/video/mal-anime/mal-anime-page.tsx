"use client";

import { Input } from "@/components/ui/input";
import AnimeCard from "@/features/components/anime-card";
import PaginationSection from "@/features/components/pagination-section";
import useGetMalAnimes from "@/features/hooks/use-get-mal-animes";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";

const MalAnimePage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);

  const [debounceSearch] = useDebounceValue(search, 1000);

  const { data: animes, isPending } = useGetMalAnimes({
    q: debounceSearch,
    page,
    take: 10,
  });

  return (
    <main className="p-4">
      <div className="flex justify-between">
        <div className="text-xl font-bold">
          Anime Search
        </div>

        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="mb-4 flex max-w-md"
        />
      </div>

      {isPending && <div>Loading...</div>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {animes?.data.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>

      {animes && (
        <div className="mt-12">
          <PaginationSection
            page={animes.pagination.page}
            take={animes.pagination.take}
            totalPages={Math.ceil(animes.pagination.total / animes.pagination.take)}
            setPage={setPage}
            setTake={setTake}
          />
        </div>
      )}
    </main>
  );
};

export default MalAnimePage;