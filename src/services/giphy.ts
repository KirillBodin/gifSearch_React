import type { GiphyGif, GiphySearchResponse } from "../types/GiphyTypes";

const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const GIPHY_SEARCH_URL = "https://api.giphy.com/v1/gifs/search";

export interface GifSearchResult {
  gifs: GiphyGif[];
  totalCount: number;
  offset: number;
}

export async function searchGifs(
  query: string,
  limit: number = 20,
  offset: number = 0
): Promise<GifSearchResult> {
  if (!query.trim()) {
    return { gifs: [], totalCount: 0, offset: 0 };
  }

  const url = new URL(GIPHY_SEARCH_URL);
  url.searchParams.set("api_key", GIPHY_API_KEY);
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));
  url.searchParams.set("rating", "g");

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Giphy API error: ${res.status}`);
  }

  const data: GiphySearchResponse = await res.json();

  return {
    gifs: data.data,
    totalCount: data.pagination.total_count,
    offset: data.pagination.offset,
  };
}
