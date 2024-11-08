import React, { useState, useEffect } from "react";

// Define the structure of the GeoJSON feature (adjust according to your data)
type FeatureData = {
  id: string; // assuming the GeoJSON features have a unique 'id' property
  name: string;
  description: string;
};

type AddFavoriteButtonProps = {
  feature: FeatureData; // Passing the current feature data from the clicked pin
};

const AddFavoriteButton: React.FC<AddFavoriteButtonProps> = ({ feature }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedFavorites: FeatureData[] = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );
    const isPinFavorite = savedFavorites.some(
      (favFeature) => favFeature.id === feature.id,
    );
    setIsFavorite(isPinFavorite);
  }, [feature.id]);

  const addToFavorites = () => {
    const savedFavorites: FeatureData[] = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );

    if (!isFavorite) {
      savedFavorites.push(feature);
      localStorage.setItem("favorites", JSON.stringify(savedFavorites));
      setIsFavorite(true);
    }
  };

  const removeFromFavorites = () => {
    let savedFavorites: FeatureData[] = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );
    savedFavorites = savedFavorites.filter(
      (favFeature) => favFeature.id !== feature.id,
    );
    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    setIsFavorite(false);
  };

  return (
    <div>
      {isFavorite ? (
        <button onClick={removeFromFavorites}>Remove from Favorites</button>
      ) : (
        <button onClick={addToFavorites}>Add to Favorites</button>
      )}
    </div>
  );
};

export default AddFavoriteButton;
