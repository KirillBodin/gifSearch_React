import { useCallback, useEffect, useRef, useState } from "react";
import type { GiphyGif } from "../types/GiphyTypes";
import { searchGifs } from "../api/giphyClient";

const PAGE_SIZE = 20;

type Status = "idle" | "loading" | "success" | "error";

interface UseGifSearchResult {
  gifs: GiphyGif[];
  status: Status;
  isLoadingMore: boolean;
  errorMessage: string | null;
  hasMore: boolean;
  query: string;
  search: (query: string) => void;
  loadMore: () => void;
}

export function useGifSearch(): UseGifSearchResult {
  const [gifs, setGifs] = useState<GiphyGif[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const cancelOngoingRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const fetchPage = useCallback(
    async (nextQuery: string, nextOffset: number, isLoadMore = false) => {
      if (!nextQuery.trim()) return;

      cancelOngoingRequest();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      if (!isLoadMore) {
        setStatus("loading");
        setErrorMessage(null);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const response = await searchGifs({
          query: nextQuery,
          limit: PAGE_SIZE,
          offset: nextOffset,
          signal: controller.signal,
        });

        setHasMore(
          response.pagination.offset + response.pagination.count <
            response.pagination.total_count
        );

        setGifs((prev) =>
          isLoadMore ? [...prev, ...response.data] : response.data
        );
        setOffset(nextOffset + PAGE_SIZE);
        setStatus("success");
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Failed to fetch gifs", error);
        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load GIFs"
        );
        setStatus("error");
      } finally {
        setIsLoadingMore(false);
      }
    },
    [cancelOngoingRequest]
  );

  const search = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);
      setOffset(0);
      setGifs([]);
      fetchPage(newQuery, 0, false);
    },
    [fetchPage]
  );

  const loadMore = useCallback(() => {
    if (!hasMore || status === "loading" || isLoadingMore) return;
    fetchPage(query, offset, true);
  }, [fetchPage, query, offset, hasMore, status, isLoadingMore]);

  useEffect(() => {
    return () => {
      cancelOngoingRequest();
    };
  }, [cancelOngoingRequest]);

  return {
    gifs,
    status,
    isLoadingMore,
    errorMessage,
    hasMore,
    query,
    search,
    loadMore,
  };
}
