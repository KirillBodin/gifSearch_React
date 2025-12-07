import React from "react";
import type { GiphyGif } from "../types/GiphyTypes";

interface GifCardProps {
  gif: GiphyGif;
  onClick: () => void;
}

const GifCard: React.FC<GifCardProps> = ({ gif, onClick }) => {
  const author = gif.username || gif.user?.username || "Unknown author";

  return (
    <div className="gif-card" onClick={onClick}>
      <img
        className="gif-card-image"
        src={gif.images.fixed_height.url}
        alt={gif.title || "GIF"}
        loading="lazy"
      />
      <div className="gif-card-body">
        <div className="gif-card-title">{gif.title || "Untitled"}</div>
        <div className="gif-card-author">Author: {author}</div>
      </div>
    </div>
  );
};

export default GifCard;
