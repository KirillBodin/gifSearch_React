import React, { memo } from "react";
import type { GiphyGif } from "../../types/GiphyTypes";
import { GifCard } from "./GifCard";
import "./gifs.css";

interface GifGridProps {
  gifs: GiphyGif[];
  onGifClick: (gif: GiphyGif) => void;
  onDownload: (gif: GiphyGif) => void;
  onCopyLink: (gif: GiphyGif) => void;
  hasMore: boolean;
  onLoadMore: () => void;
  isLoadingMore: boolean;
}

function GifGridBase({
  gifs,
  onGifClick,
  onDownload,
  onCopyLink,
  hasMore,
  onLoadMore,
  isLoadingMore,
}: GifGridProps) {
  return (
    <div className="gif-grid-wrapper">
      <div className="gif-grid">
        {gifs.map((gif) => (
          <GifCard
            key={gif.id}
            gif={gif}
            onOpen={onGifClick}
            onDownload={onDownload}
            onCopyLink={onCopyLink}
          />
        ))}
      </div>

      {hasMore && (
        <button
          className="load-more-btn"
          type="button"
          onClick={onLoadMore}
          disabled={isLoadingMore}
        >
          {isLoadingMore ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}

export const GifGrid = memo(GifGridBase);
