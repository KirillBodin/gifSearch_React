import { useCallback, useMemo, useState } from "react";
import { AppLayout } from "./components/layout/AppLayout";
import { SearchBar } from "./components/search/SearchBar";
import { GifGridWithModal } from "./components/gifs/GifGridWithModal";
import { LoadingState } from "./components/states/LoadingState";
import { ErrorState } from "./components/states/ErrorState";
import { EmptyState } from "./components/states/EmptyState";
import { useGifSearch } from "./hooks/useGifSearch";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const { gifs, status, isLoadingMore, errorMessage, hasMore, search, loadMore } =
    useGifSearch();

  const isInitial = useMemo(
    () => status === "idle" && gifs.length === 0,
    [status, gifs.length]
  );

  const handleSearchSubmit = useCallback(() => {
    if (!searchInput.trim()) return;
    search(searchInput.trim());
  }, [searchInput, search]);

  return (
    <AppLayout>
      <SearchBar
        value={searchInput}
        onChange={setSearchInput}
        onSubmit={handleSearchSubmit}
        isLoading={status === "loading"}
      />

      {status === "loading" && <LoadingState message="Searching GIFs..." />}

      {status === "error" && errorMessage && (
        <ErrorState message={errorMessage} />
      )}

      {status === "success" && gifs.length === 0 && (
        <EmptyState
          title="Nothing found"
          description="Try another keyword or phrase"
        />
      )}

      {isInitial && <EmptyState />}

      {gifs.length > 0 && (
        <GifGridWithModal
          gifs={gifs}
          hasMore={hasMore}
          onLoadMore={loadMore}
          isLoadingMore={isLoadingMore}
        />
      )}
    </AppLayout>
  );
}
