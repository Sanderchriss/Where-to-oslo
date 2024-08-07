/*
import React, { useContext, useEffect, useState, ChangeEvent } from "react";
import { MainContext } from "../map/MainContext";
import SearchButton from "./SearchButton";
import "../css/iconStyles.css";
import {SearchLocations} from "./SearchLocations";

type Feature = {
  type: string;
  properties: {
    name: string;
    [key: string]: any; // Additional properties
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
};

export const SearchEngine: React.FC<{ showOverlay: boolean; toggleOverlay: () => void
}> = ({showOverlay, toggleOverlay}) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Feature[]>([]);

  // State to hold data from all JSON files
  const [allData, setAllData] = useState<Feature[]>([]);

  const { map } = useContext(MainContext);

  // Function to handle fetching data from multiple JSON files
  const fetchData = async (filePaths: string[]) => {
    const promises = filePaths.map(async (filePath) => {
      const response = await fetch(filePath);
      const data = await response.json();
      return data.features as Feature[]; // Assuming features holds data in each file
    });

    const allFeatures = await Promise.all(promises);
    setAllData(allFeatures.flat()); // Combine features from all files
  };

  useEffect(() => {
    // Provide an array of file paths to the fetchData function
    fetchData([
      "json/activity.geojson",
      "json/activity.geojson",
      "json/drinks.geojson",
      "json/store.geojson",
      "json/activity.geojson",
    ]);
  }, []);

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    toggleOverlay();
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    if (e.target.value) {
      setSearchResults(
          allData.filter((feature) =>
              feature.properties.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()),
          ),
      );
    } else {
      setSearchResults([]);
    }
  };
  const handleSelect = (feature: Feature) => {
    setSearchQuery(feature.properties.name);
    setShowSearch(false);
    map.getView().animate({
      center: feature.geometry.coordinates,
      zoom: 18,
    });
    setSearchQuery("");
    setShowSearch(false);
    setSearchResults([]);
  };
  return (
      <div className={`position-relative ${showOverlay ? "show" : ""}`}>
        <div className="button-container">
          <SearchButton onClick={() => toggleOverlay()}/>
          {showOverlay && (
              <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
              />
          )}
          <SearchLocations showOverlay={showOverlay} toggleOverlay={toggleOverlay}/>
        </div>
      </div>
  );
};
*/
