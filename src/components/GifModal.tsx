import React, { useMemo } from "react";
import type { GiphyGif } from "../types/GiphyTypes";

interface GifModalProps {
  gif: GiphyGif | null;
  isOpen: boolean;
  onClose: () => void;
  onCopyLink: (gif: GiphyGif) => void;
  onDownload: (gif: GiphyGif) => void;
}

const GifModal: React.FC<GifModalProps> = ({
  gif,
  isOpen,
  onClose,
  onCopyLink,
  onDownload,
}) => {
  const meta = useMemo(() => {
    if (!gif) return null;

    const author = gif.username || gif.user?.username || "Unknown author";

    const dateRaw =
      (gif.import_datetime && gif.import_datetime !== "0000-00-00 00:00:00"
        ? gif.import_datetime
        : null) ||
      (gif.trending_datetime &&
      gif.trending_datetime !== "0000-00-00 00:00:00"
        ? gif.trending_datetime
        : null);

    let formattedDate = "Unknown";
    if (dateRaw) {
      const d = new Date(dateRaw);
      if (!Number.isNaN(d.getTime())) {
        formattedDate = d.toLocaleString("en-US");
      }
    }

    const rating = gif.rating ? gif.rating.toUpperCase() : "N/A";
    const url = gif.url || gif.images.original.url;

    return { author, formattedDate, rating, url };
  }, [gif]);

  if (!isOpen || !gif || !meta) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{gif.title || "GIF Details"}</div>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-image-wrapper">
            <img
              className="modal-image"
              src={gif.images.original.url}
              alt={gif.title || "GIF"}
            />
          </div>

          <div className="modal-meta">
            <div className="modal-meta-row">
              <span className="modal-meta-label">Author:</span> {meta.author}
            </div>
            <div className="modal-meta-row">
              <span className="modal-meta-label">Created at:</span>{" "}
              {meta.formattedDate}
            </div>
            <div className="modal-meta-row">
              <span className="modal-meta-label">Rating:</span> {meta.rating}
            </div>
            <div className="modal-meta-row">
              <span className="modal-meta-label">URL:</span>{" "}
              <a
                href={meta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {meta.url}
              </a>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn" onClick={() => onCopyLink(gif)}>
            Copy link
          </button>
          <button className="btn btn-primary" onClick={() => onDownload(gif)}>
            Download GIF
          </button>
          <button className="btn" onClick={() => window.open(meta.url, "_blank")}>
            Open in new tab
          </button>
        </div>
      </div>
    </div>
  );
};

export default GifModal;
