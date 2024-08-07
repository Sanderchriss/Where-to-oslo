import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import { MainContext } from "../map/MainContext";
import "../css/iconStyles.css";
import SearchButton from "./SearchButton";

export interface SearchJson {
  properties: SearchProperties;
  geometry: {
    type: "Point";
    coordinates: number[];
  };
}

export interface SearchProperties {
  name: string;
}

interface SearchLocations2Props {
  showOverlay: boolean;
  toggleOverlay: () => void;
}

export function SearchLocations2({ showOverlay }: SearchLocations2Props) {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchJson[]>([]);
  const { map } = useContext(MainContext);
  const [isOverlayVisible, setIsOverlayVisible] = useState(showOverlay);

  useEffect(() => {
    const fetchFiles = async () => {
      const files = [
        "json/activity.geojson",
        "json/restaurants.geojson",
        "json/drinks.geojson",
        "json/store.geojson",
        "json/cafe.geojson",
      ];
      const data = await Promise.all(
        files.map((file) => fetch(file).then((response) => response.json())),
      );

      const mergedFeatures = data.flatMap(
        (datum: { features: SearchJson[] }) => datum.features,
      );
      setSearchResults(mergedFeatures);
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    setIsOverlayVisible(showOverlay);
  }, [showOverlay]);

  const onSelect = (selectedLocation: SearchProperties) => {
    const location = searchResults.find(
      (s) => s.properties.name === selectedLocation.name,
    );
    if (location) {
      map.getView().animate({
        center: location.geometry.coordinates,
        zoom: 14,
      });
      setValue(""); // Clear the input
      setIsOverlayVisible(false); // Hide the overlay
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleCloseOverlay = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    setIsOverlayVisible(false);
  };

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  return (
    <div>
      <SearchButton onClick={() => setIsOverlayVisible(!isOverlayVisible)} />
      <div
        className={`position-relative ${
          isOverlayVisible ? "search-overlay show" : "search-overlay hide"
        }`}
        onClick={(e) => handleCloseOverlay(e)}
      >
        <div className="search-overlay-content" onClick={handleInputClick}>
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search..."
            onClick={handleInputClick}
            className="search-input"
          />
          <button
            className="overlay-close-button"
            onClick={(e) =>
              handleCloseOverlay(e as React.MouseEvent<HTMLButtonElement>)
            }
          >
            &times;
          </button>
          <div className={`search-results ${value ? "show" : ""}`}>
            {searchResults
              .filter((s) =>
                s.properties.name.toLowerCase().startsWith(value.toLowerCase()),
              )
              .map((s, index) => (
                <div
                  key={index}
                  className="search-result-item"
                  onClick={() => onSelect(s.properties)}
                  style={{ cursor: "pointer", margin: "2px 0" }}
                >
                  {s.properties.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
