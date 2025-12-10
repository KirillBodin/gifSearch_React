import React, { memo, useMemo } from "react";
import type { GiphyGif } from "../../types/GiphyTypes";

interface GifCardProps {
  gif: GiphyGif;
  onOpen: (gif: GiphyGif) => void;
  onDownload: (gif: GiphyGif) => void;
  onCopyLink: (gif: GiphyGif) => void;
}

function GifCardBase({ gif, onOpen, onDownload, onCopyLink }: GifCardProps) {
  const previewUrl = useMemo(
    () => gif.images.fixed_width?.url ?? gif.images.original.url,
    [gif]
  );

  return (
    <div
      className="gif-card"
      onClick={() => onOpen(gif)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(gif);
        }
      }}
    >
      <img src={previewUrl} alt={gif.title} className="gif-image" />

      <div className="gif-info">
        <p className="gif-title">{gif.title || "Untitled GIF"}</p>
        {gif.username && <p className="gif-author">by {gif.username}</p>}

        <div className="gif-actions">
          <button
            className="gif-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDownload(gif);
            }}
          >
            ⬇️
          </button>

          <button
            className="gif-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCopyLink(gif);
            }}
          >
            🔗
          </button>
        </div>
      </div>
    </div>
  );
}

export const GifCard = memo(GifCardBase);
