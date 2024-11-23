import React, { useState, useEffect } from "react";
import IconButton from "./iconsButton";
import "../css/iconStyles.css";

// Define the structure of the GeoJSON feature (adjust according to your data)
type FeatureData = {
  id: string;
  name: string;
  description: string;
};

export const FavoriteButton: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<FeatureData[]>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites: FeatureData[] = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );
    setFavorites(savedFavorites);
  }, []);

  // Helper to handle removing an item from favorites
  const removeFavorite = (featureId: string) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== featureId,
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <>
      <IconButton className="favorite-button" onClick={handleShow}>
        <img
          src="images/FavoriteBtn.svg"
          alt="Favorite Icon"
          className="icon"
        />
      </IconButton>

      {show && (
        <div className="favorite-overlay show" onClick={handleClose}>
          <div
            className="favorite-overlay-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="overlay-close-button" onClick={handleClose}>
              &times;
            </button>
            <h2>Favorite Places</h2>
            {favorites.length > 0 ? (
              <ul>
                {favorites.map((favorite) => (
                  <li key={favorite.id}>
                    <strong>{favorite.name}</strong> - {favorite.description}
                    <button onClick={() => removeFavorite(favorite.id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No favorite locations saved.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FavoriteButton;
