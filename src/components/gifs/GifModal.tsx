import React from "react";
import type { GiphyGif } from "../../types/GiphyTypes";

interface GifModalProps {
  isOpen: boolean;
  onClose: () => void;
  gif: GiphyGif | null;
  onDownload: (gif: GiphyGif) => void;
  onCopyLink: (gif: GiphyGif) => void;
}

function formatDate(raw?: string): string | null {
  if (!raw || raw === "0000-00-00 00:00:00") return null;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function GifModal({
  isOpen,
  onClose,
  gif,
  onDownload,
  onCopyLink,
}: GifModalProps) {
  if (!isOpen || !gif) return null;

  const sourceUrl = gif.images.original.url;
  const author = gif.username && gif.username.trim().length > 0
    ? gif.username
    : "Unknown";
  const createdAt = formatDate(gif.import_datetime);
  const rating = gif.rating?.toUpperCase();

  const sizeInfo = `${gif.images.original.width}×${gif.images.original.height}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-title">{gif.title || "GIF preview"}</h2>

        <img src={sourceUrl} alt={gif.title} className="modal-gif" />

        <div className="modal-meta">
          <div className="modal-meta__row">
            <span className="modal-meta__label">Author:</span>
            <span className="modal-meta__value">{author}</span>
          </div>

          {createdAt && (
            <div className="modal-meta__row">
              <span className="modal-meta__label">Created:</span>
              <span className="modal-meta__value">{createdAt}</span>
            </div>
          )}

          <div className="modal-meta__row">
            <span className="modal-meta__label">Size:</span>
            <span className="modal-meta__value">{sizeInfo}</span>
          </div>

          {rating && (
            <div className="modal-meta__row">
              <span className="modal-meta__label">Rating:</span>
              <span className="modal-meta__value">{rating}</span>
            </div>
          )}

          <div className="modal-meta__row">
            <span className="modal-meta__label">Link:</span>
            <a
              href={gif.url}
              target="_blank"
              rel="noreferrer"
              className="modal-meta__link"
            >
              Open on Giphy
            </a>
          </div>
        </div>

        <div className="modal-actions">
          <button className="modal-btn" onClick={() => onDownload(gif)}>
            Download
          </button>
          <button className="modal-btn" onClick={() => onCopyLink(gif)}>
            Copy link
          </button>
          <button className="modal-btn close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
