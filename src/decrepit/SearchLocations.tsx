/*import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import { MainContext } from "../map/MainContext";
import "../css/iconStyles.css"

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

export function SearchLocations({ showOverlay, toggleOverlay}: {showOverlay: boolean; toggleOverlay: () => void }) {
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchJson[]>([]);

  const { map } = useContext(MainContext);

  useEffect(() => {
    const fetchFiles = async () => {
      const files = [
        "json/activity.geojson",
        "json/activity.geojson",
        "json/drinks.geojson",
        "json/store.geojson",
        "json/activity.geojson",
      ];
      const data = await Promise.all(
          files.map((file) => fetch(file).then((response) => response.json())),
      );

      const mergedFeatures = data.flatMap(
          (datum: { features: SearchJson[] }) => datum.features,
      );
      const names = mergedFeatures.map(
          (feature: SearchJson) => feature.properties.name,
      );

      setSearchResults(mergedFeatures);
      setSearchQuery(names);
    };

    fetchFiles();
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSelect = (f: SearchProperties) => {
    const selectedLocation = searchResults.find(
        (s) => s.properties.name === f.name,
    );
    if (selectedLocation) {
      setValue(selectedLocation.properties.name);
      map.getView().animate({
        center: selectedLocation.geometry.coordinates,
        zoom: 14,
      });
    }
    toggleOverlay();
  };

  return (
      <div className={`stationdropdown ${showOverlay ? "show" : ""}`}>
        {searchResults
            .filter((s) => {
              const searchTerm = value.toLowerCase();
              const locationAddress = s.properties.name.toLowerCase();
              return searchTerm && locationAddress.startsWith(searchTerm);
            })
            .map((s, index) => (
                <div
                    onClick={() => onSelect(s.properties)}
                    className="dropdown-row"
                    key={index}
                    style={{
                      cursor: "pointer",
                      margin: "2px 0",
                      color: "#bf00ff",
                    }}
                >
                  {s.properties.name}
                </div>
            ))}
      </div>
  );
}*/
