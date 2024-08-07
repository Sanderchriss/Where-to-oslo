import React from "react";
const addFavoriteButton = () => {
  const handleClick = () => {
    alert("message");
  };

  return (
    <button onClick={handleClick}>
      <img src="images/FavoriteBtn.svg" alt="Favorite Icon" className="icon" />
    </button>
  );
};
export default addFavoriteButton;
