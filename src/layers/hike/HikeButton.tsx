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
import { activeHikeStyle, hikeStyle } from "./HikeStyle";
import "../../css/BottomNavbar.css";

const hikeLayer = new VectorLayer({
  className: "Hike",
  source: new VectorSource({
    url: "/Where-to-oslo/json/hike.geojson",
    format: new GeoJSON(),
  }),
  style: hikeStyle,
});

export function HikeButton() {
  const [clicked, setClicked] = useState(true);
  const [activeFeature, setActiveFeature] = useState<hikeStyle | undefined>();
  const { setHikeFeatureLayers, map } = useContext(MainContext);

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
      layerFilter: (l) => l === hikeLayer,
    });
    if (features.length === 1) {
      setActiveFeature(features[0] as hikeStyle);
      overlay.setPosition(e.coordinate);
    } else {
      setActiveFeature(undefined);
      overlay.setPosition(undefined);
    }
  }

  useEffect(() => {
    activeFeature?.setStyle(activeHikeStyle);
    return () => activeFeature?.setStyle(undefined);
  }, [activeFeature]);

  useEffect(() => {
    if (clicked) {
      setHikeFeatureLayers((old: any) => [...old, hikeLayer]);
      map?.on("click", handlePointerMove);
    } else {
      setHikeFeatureLayers((old: any) =>
        old.filter((l: any) => l !== hikeLayer),
      );
      map?.un("click", handlePointerMove);
    }
  }, [clicked, setHikeFeatureLayers, map]);

  return (
    <div
      className={`category-button ${clicked ? "clicked" : ""}`}
      onClick={() => setClicked((prevClicked) => !prevClicked)}
    >
      <img
        src="/Where-to-oslo/images/tripPin.svg"
        alt="Hike"
        className="pin-icon"
        style={{ width: "3rem", height: "3rem" }}
      />
      <span>Hike</span>
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
