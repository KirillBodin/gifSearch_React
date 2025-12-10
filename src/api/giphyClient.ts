import type { SearchGifsResponse } from "../types/GiphyTypes";

const API_BASE_URL = "https://api.giphy.com/v1/gifs";

const API_KEY = (import.meta as any).env.VITE_GIPHY_API_KEY as string;

if (!API_KEY) {
  console.error("Missing VITE_GIPHY_API_KEY in environment variables");
}

interface SearchParams {
  query: string;
  limit: number;
  offset: number;
  signal?: AbortSignal;
}

export async function searchGifs({
  query,
  limit,
  offset,
  signal,
}: SearchParams): Promise<SearchGifsResponse> {
  const url = new URL(`${API_BASE_URL}/search`);

  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));
  url.searchParams.set("rating", "pg");
  url.searchParams.set("lang", "en");

  const response = await fetch(url.toString(), { signal });

  if (!response.ok) {
    throw new Error(`Giphy request failed with ${response.status}`);
  }

  return response.json();
}
