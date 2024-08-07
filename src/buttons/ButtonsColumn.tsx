import React, { useState } from "react";
import { CenterOnUser } from "./centerOnUser";
import { FavoriteButton } from "./favoriteButton";
import { SettingsButton } from "./settingsButton";
import "../css/iconStyles.css";
import { SearchLocations2 } from "./SearchLocations2";

export const ButtonsColumn: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <>
      <div className="buttons-column">
        <SearchLocations2
          showOverlay={showOverlay}
          toggleOverlay={toggleOverlay}
        />
        <CenterOnUser />
        <FavoriteButton />
        <SettingsButton />
      </div>
    </>
  );
};
