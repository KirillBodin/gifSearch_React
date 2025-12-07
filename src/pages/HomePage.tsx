import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import GifCard from "../components/GifCard";
import GifModal from "../components/GifModal";
import { useGifSearch } from "../hooks/useGifSearch";
import type { GiphyGif } from "../types/GiphyTypes";

const HomePage: React.FC = () => {
  const {
    gifs,
    isLoading,
    isLoadingMore,
    error,
    lastQuery,
    totalCount,
    hasMore,
    search,
    loadMore,
  } = useGifSearch();

  const [selectedGif, setSelectedGif] = useState<GiphyGif | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (gif: GiphyGif) => {
    setSelectedGif(gif);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGif(null);
  };

  const handleCopyLink = async (gif: GiphyGif) => {
    const url = gif.url || gif.images.original.url;
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    } catch (e) {
      console.error(e);
      alert("Failed to copy link");
    }
  };

  const handleDownload = async (gif: GiphyGif) => {
    const url = gif.images.original.url;
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${gif.slug || gif.id || "gif"}.gif`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);

      alert("Download started");
    } catch (e) {
      console.error(e);
      alert("Failed to download GIF");
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">GIF Search</h1>
        <p className="page-subtitle">
          Enter a keyword to search GIFs using the Giphy API. Click on a GIF to
          view details, copy the link, or download it.
        </p>
        <SearchBar onSearch={search} />
      </header>

      {!isLoading && error && <div className="error-box">{error}</div>}

      {isLoading && (
        <div className="loader-wrapper">
          <div className="loader-spinner" />
          <div className="loader-text">Loading GIFs...</div>
        </div>
      )}

      {!isLoading && !error && gifs.length === 0 && lastQuery && (
        <p className="text-center mt-4">
          No results found for <b>{lastQuery}</b> 😢
        </p>
      )}

      {gifs.length > 0 && (
        <>
          <div className="gifs-header">
            Found <b>{gifs.length}</b> of <b>{totalCount}</b>{" "}
            {lastQuery && (
              <>
                results for <b>{lastQuery}</b>
              </>
            )}
          </div>

          <div className="gifs-grid">
            {gifs.map((gif) => (
              <GifCard
                key={gif.id}
                gif={gif}
                onClick={() => handleOpenModal(gif)}
              />
            ))}
          </div>

          {hasMore && !isLoading && (
            <div className="load-more-wrapper">
              <button
                className="btn btn-primary"
                onClick={loadMore}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </>
      )}

      <GifModal
        gif={selectedGif}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCopyLink={handleCopyLink}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default HomePage;
