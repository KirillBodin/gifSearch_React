import { useCallback, useState } from "react";
import type { GiphyGif } from "../types/GiphyTypes";
import { searchGifs } from "../services/giphy";

const PAGE_SIZE = 20;

export function useGifSearch() {
  const [gifs, setGifs] = useState<GiphyGif[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const search = useCallback(async (query: string) => {
    const trimmed = query.trim();
    setLastQuery(trimmed);
    setError(null);

    if (!trimmed) {
      setGifs([]);
      setTotalCount(0);
      setOffset(0);
      return;
    }

    try {
      setIsLoading(true);
      const result = await searchGifs(trimmed, PAGE_SIZE, 0);

      setGifs(result.gifs);
      setTotalCount(result.totalCount);
      setOffset(result.offset + result.gifs.length);
    } catch (err) {
      console.error(err);
      setError("Failed to load GIFs. Check console.");
      setGifs([]);
      setTotalCount(0);
      setOffset(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (!lastQuery) return;
    if (gifs.length >= totalCount) return;

    try {
      setIsLoadingMore(true);
      const result = await searchGifs(lastQuery, PAGE_SIZE, offset);

      setGifs((prev) => [...prev, ...result.gifs]);
      setOffset((prev) => prev + result.gifs.length);
    } catch (err) {
      console.error(err);
      setError("Failed to load more GIFs.");
    } finally {
      setIsLoadingMore(false);
    }
  }, [lastQuery, gifs.length, totalCount, offset]);

  const hasMore = gifs.length < totalCount;

  return {
    gifs,
    isLoading,
    isLoadingMore,
    error,
    lastQuery,
    totalCount,
    hasMore,
    search,
    loadMore,
  };
}
