import React, { useState, useCallback, useRef, useEffect } from "react";
import type { GiphyGif } from "../../types/GiphyTypes";
import { GifGrid } from "./GifGrid";
import { GifModal } from "./GifModal";
import { copyGifLink, downloadGif } from "../../utils/gifActions";

const TOAST_DURATION = 2000;

interface GifGridWithModalProps {
  gifs: GiphyGif[];
  hasMore: boolean;
  onLoadMore: () => void;
  isLoadingMore: boolean;
}

export function GifGridWithModal({
  gifs,
  hasMore,
  onLoadMore,
  isLoadingMore,
}: GifGridWithModalProps) {
  const [selected, setSelected] = useState<GiphyGif | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setToast(null);
      timeoutRef.current = null;
    }, TOAST_DURATION);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const openGif = useCallback((gif: GiphyGif) => {
    setSelected(gif);
  }, []);

  const closeGif = useCallback(() => {
    setSelected(null);
  }, []);

  const handleDownload = useCallback(
    async (gif: GiphyGif) => {
      await downloadGif(gif.images.original.url, `${gif.id}.gif`);
      showToast("GIF downloaded");
    },
    [showToast]
  );

  const handleCopyLink = useCallback(
    async (gif: GiphyGif) => {
      await copyGifLink(gif.url);
      showToast("Link copied to clipboard");
    },
    [showToast]
  );

  return (
    <>
      <GifGrid
        gifs={gifs}
        onGifClick={openGif}
        onDownload={handleDownload}
        onCopyLink={handleCopyLink}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
        isLoadingMore={isLoadingMore}
      />

      <GifModal
        isOpen={!!selected}
        onClose={closeGif}
        gif={selected}
        onDownload={handleDownload}
        onCopyLink={handleCopyLink}
      />

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
