import React, { useContext, useState } from "react";
import { MainContext } from "../map/MainContext";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import IconButton from "./iconsButton";
import "../css/iconStyles.css";
import { Icon, Style } from "ol/style";

export const CenterOnUser: React.FC = () => {
  const { map } = useContext(MainContext);
  const [show, setShow] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        map.getView().animate({ center: [longitude, latitude], zoom: 17 });
        const marker = new Feature(new Point([longitude, latitude]));
        const iconStyle = new Style({
          image: new Icon({
            src: "/images/LocationBtn.svg",
            anchor: [0.5, 1],
            scale: 1,
          }),
        });
        marker.setStyle(iconStyle);
        const vectorSource = new VectorSource({
          features: [marker],
        });
        const vectorLayer = new VectorLayer({
          source: vectorSource,
        });
        map.addLayer(vectorLayer);
        setShow(true);

        const updateLocation = () => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const { latitude, longitude } = pos.coords;
              marker.setGeometry(new Point([longitude, latitude]));
            },
            (error) => {
              console.error("Error getting geolocation:", error);
            },
          );
        };

        updateLocation(); // Update location initially

        const updateInterval = setInterval(updateLocation, 5000); // Update location every 5 seconds

        return () => {
          clearInterval(updateInterval); // Cleanup interval on component unmount
        };
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      },
    );
  };

  return (
    <IconButton className="position-button" onClick={handleClick}>
      <img src="images/PositionBtn.svg" alt="Position Icon" className="icon" />
    </IconButton>
  );
};
