// SearchButton.tsx
import React from "react";
import "../css/iconStyles.css";
import IconButton from "./iconsButton";

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <IconButton className="search-button" onClick={handleClick}>
      <img src="images/SearchBtn.svg" alt="Search Icon" className="icon" />
    </IconButton>
  );
};

export default SearchButton;
