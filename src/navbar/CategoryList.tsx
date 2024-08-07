import React, { useEffect, useRef, useState } from "react";
import { CafeButton } from "../layers/cafe/CafeButton";
import { StoreButton } from "../layers/store/StoreButton";
import { ActivityButton } from "../layers/activity/ActivityButton";
import { DrinksButton } from "../layers/drink/DrinksButton";
import { RestaurantButton } from "../layers/restaurant/RestaurantButton";
import { HikeButton } from "../layers/hike/HikeButton";
import "../css/BottomNavbar.css";

interface CategoryListProps {
  show: boolean;
  handleClose: () => void;
}

interface Category {
  name: string;
  icon: string;
  component: React.ElementType;
}

const categories: Category[] = [
  {
    name: "Restaurants",
    icon: "/WhereToOslo/images/restaurants_4.svg",
    component: RestaurantButton,
  },
  {
    name: "Shopping",
    icon: "/WhereToOslo/images/storePin_2.svg",
    component: StoreButton,
  },
  {
    name: "Cafes",
    icon: "/WhereToOslo/images/kafePin_4.svg",
    component: CafeButton,
  },
  {
    name: "Activities",
    icon: "/WhereToOslo/images/activityPin_4.svg",
    component: ActivityButton,
  },
  {
    name: "Bars",
    icon: "/WhereToOslo/images/beerPin.svg",
    component: DrinksButton,
  },
  {
    name: "Hikes",
    icon: "/WhereToOslo/images/tripPin.svg",
    component: HikeButton,
  },
];

export const CategoryList: React.FC<CategoryListProps> = ({
  show,
  handleClose,
}) => {
  const [isOverlayVisible, setOverlayVisible] = useState(show);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOverlayVisible(show);
  }, [show]);

  const handleCloseOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
      setOverlayVisible(false);
      handleClose();
    }
  };

  return (
    <>
      {isOverlayVisible && (
        <div className="blur-background" onClick={handleCloseOverlay} />
      )}
      <div
        ref={overlayRef}
        className={isOverlayVisible ? "overlay show" : "overlay hide"}
        onClick={handleCloseOverlay}
      >
        <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
          <div className="category-list">
            {categories.map((category, index) => (
              <div key={index} className="category-item">
                <category.component />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
