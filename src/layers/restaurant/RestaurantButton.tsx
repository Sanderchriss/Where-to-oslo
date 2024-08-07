import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { MapBrowserEvent, Overlay } from "ol";
import { FeatureLike } from "ol/Feature";
import { MainContext } from "../../map/MainContext";
import { activeRestaurantStyle, restaurantStyle } from "./RestaurantStyle";
import "../../css/BottomNavbar.css";

const restaurantLayer = new VectorLayer({
  className: "Restaurant",
  source: new VectorSource({
    url: "/Where-to-oslo/json/restaurants.geojson",
    format: new GeoJSON(),
  }),
  style: restaurantStyle,
});

export function RestaurantButton() {
  const [clicked, setClicked] = useState(true);
  const [activeFeature, setActiveFeature] = useState<
    restaurantStyle | undefined
  >();
  const { setRestaurantFeatureLayers, map } = useContext(MainContext);

  const overlay = useMemo(() => new Overlay({}), []);
  const overlayRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    overlay.setElement(overlayRef.current);
    map.addOverlay(overlay);
    return () => {
      map.removeOverlay(overlay);
    };
  }, [overlay, map]);

  function handlePointerMove(e: MapBrowserEvent<MouseEvent>) {
    const features: FeatureLike[] = [];
    map.forEachFeatureAtPixel(e.pixel, (f) => features.push(f), {
      hitTolerance: 5,
      layerFilter: (l) => l === restaurantLayer,
    });
    if (features.length === 1) {
      setActiveFeature(features[0] as restaurantStyle);
      overlay.setPosition(e.coordinate);
    } else {
      setActiveFeature(undefined);
      overlay.setPosition(undefined);
    }
  }

  useEffect(() => {
    activeFeature?.setStyle(activeRestaurantStyle);
    return () => activeFeature?.setStyle(undefined);
  }, [activeFeature]);

  useEffect(() => {
    if (clicked) {
      setRestaurantFeatureLayers((old: any) => [...old, restaurantLayer]);
      map?.on("click", handlePointerMove);
    } else {
      setRestaurantFeatureLayers((old: any) =>
        old.filter((l: any) => l !== restaurantLayer),
      );
      map?.un("click", handlePointerMove);
    }
  }, [clicked, setRestaurantFeatureLayers, map]);

  return (
    <div
      className={`category-button ${clicked ? "clicked" : ""}`}
      onClick={() => setClicked((prevClicked) => !prevClicked)}
    >
      <img
        src="/Where-to-oslo/images/restaurants_4.svg"
        alt="Restaurant"
        className="pin-icon"
        style={{ width: "3rem", height: "3rem" }}
      />
      <span>Restaurant</span>
      <div ref={overlayRef} className={"pinOverlay"}>
        {activeFeature && (
          <div className="container-box">
            <p>
              <b>{activeFeature.get("name")}</b>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
