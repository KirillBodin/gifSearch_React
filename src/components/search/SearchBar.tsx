import { ChangeEvent, KeyboardEvent, memo } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

function SearchBarBase({ value, onChange, onSubmit, isLoading }: SearchBarProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="search">
      <div className="search__wrapper">
        <input
          className="search__input"
          type="text"
          placeholder="Search GIFs..."
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        {value && (
          <button
            className="search__button search__button--clear"
            type="button"
            onClick={handleClear}
          >
            ✕
          </button>
        )}

        <button
          className="search__button search__button--submit"
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
}

export const SearchBar = memo(SearchBarBase);
