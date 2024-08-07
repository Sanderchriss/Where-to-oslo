import { CategoryList } from "./CategoryList";
import React, { useState } from "react";
import Top5List from "./Top5List";

export const BottomNavbar: React.FC = () => {
  const [showCategoryOverlay, setShowCategoryOverlay] = useState(false);
  const [showTop5Overlay, setShowTop5Overlay] = useState(false);

  const toggleCategoryOverlay = () => {
    setShowCategoryOverlay(!showCategoryOverlay);
  };

  const toggleTop5Overlay = () => {
    setShowTop5Overlay(!showTop5Overlay);
  };

  const handleCloseCategoryOverlay = () => {
    setShowCategoryOverlay(false);
  };

  const handleCloseTop5Overlay = () => {
    setShowTop5Overlay(false);
  };

  return (
    <div className="bottomNavbar">
      <div className="bottomNavbar-buttons">
        <div className="bottomNavbar-item" onClick={toggleCategoryOverlay}>
          <img
            src="/Where-to-oslo/images/categoryPin.svg"
            alt="Category Icon"
            className="bottomNavbar-icon"
            id="categoryIcon"
          />
          <div className="bottomNavbar-text" id="bottomNavbarText">
            Category
          </div>
        </div>
        <div className="bottomNavbar-item" onClick={toggleTop5Overlay}>
          <img
            src="/Where-to-oslo/images/top5Pin.svg"
            alt="Top 5 Icon"
            className="bottomNavbar-icon"
            id="top5Icon"
          />
          <div className="bottomNavbar-text" id="bottomNavbarText">
            Top 5
          </div>
        </div>
      </div>
      <CategoryList
        show={showCategoryOverlay}
        handleClose={handleCloseCategoryOverlay}
      />
      <Top5List show={showTop5Overlay} handleClose={handleCloseTop5Overlay} />
    </div>
  );
};
