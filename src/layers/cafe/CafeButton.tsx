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
import { activeCafeStyle, cafeStyle } from "./CafeStyle";
import "../../css/BottomNavbar.css";

const cafeLayer = new VectorLayer({
  className: "Cafe",
  source: new VectorSource({
    url: "/Where-to-oslo/json/cafe.geojson",
    format: new GeoJSON(),
  }),
  style: cafeStyle,
});

export function CafeButton() {
  const [clicked, setClicked] = useState(true);
  const [activeFeature, setActiveFeature] = useState<cafeStyle | undefined>();
  const { setCafeFeatureLayers, map } = useContext(MainContext);

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
      layerFilter: (l) => l === cafeLayer,
    });
    if (features.length === 1) {
      setActiveFeature(features[0] as cafeStyle);
      overlay.setPosition(e.coordinate);
    } else {
      setActiveFeature(undefined);
      overlay.setPosition(undefined);
    }
  }

  useEffect(() => {
    activeFeature?.setStyle(activeCafeStyle);
    return () => activeFeature?.setStyle(undefined);
  }, [activeFeature]);

  useEffect(() => {
    if (clicked) {
      setCafeFeatureLayers((old: any) => [...old, cafeLayer]);
      map?.on("click", handlePointerMove);
    } else {
      setCafeFeatureLayers((old: any) =>
        old.filter((l: any) => l !== cafeLayer),
      );
      map?.un("click", handlePointerMove);
    }
  }, [clicked, setCafeFeatureLayers, map]);

  return (
    <div
      className={`category-button ${clicked ? "clicked" : ""}`}
      onClick={() => setClicked((prevClicked) => !prevClicked)}
    >
      <img
        src="/Where-to-oslo/images/kafePin_4.svg"
        alt="Cafe"
        className="pin-icon"
        style={{ width: "3rem", height: "3rem" }}
      />
      <span>Cafe</span>
      <div ref={overlayRef} className={"pinOverlay"}>
        {activeFeature && (
          <div className="container-box">
            <p>
              <b> {activeFeature.get("name")}</b>
            </p>
            <p></p>
          </div>
        )}
      </div>
    </div>
  );
}
