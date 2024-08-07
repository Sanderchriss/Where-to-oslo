import React, { useState } from "react";
import Overlay from "ol/Overlay";
import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultControls } from "ol/control";
import TileLayer from "ol/layer/Tile";
import { OSM, TileWMS } from "ol/source";

export function MarkerCheckboxOverlay() {
  const [overlay, setOverlay] = useState<Overlay | null>(null);

  const handleButtonClick = () => {
    const overlayElement = document.createElement("div");
    overlayElement.className = "marker-checkbox-overlay";

    // Create a simple <p> tag
    const paragraph = document.createElement("p");
    paragraph.textContent = "This is a sample overlay content";

    overlayElement.appendChild(paragraph);

    // Create the overlay
    const newOverlay = new Overlay({
      element: overlayElement,
      autoPan: true,
      position: [10.7522454, 59.9138688], // Set the initial position, adjust as needed
    });

    // Add the overlay to the map
    const map = new Map({
      layers: [new TileLayer({ source: new OSM() })],
      controls: defaultControls(),
      target: "/viewMap.tsx", // Specify your map container ID
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    map.addOverlay(newOverlay);

    setOverlay(newOverlay);
  };

  return (
    <>
      <button onClick={handleButtonClick}>Show Overlay</button>
    </>
  );
}
