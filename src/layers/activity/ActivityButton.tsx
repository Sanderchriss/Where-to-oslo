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
import "../../css/BottomNavbar.css";

import { activeActivityStyle, activityStyle } from "./ActivityStyle";

const activityLayer = new VectorLayer({
  className: "Activity",
  source: new VectorSource({
    url: "/json/activity.geojson",
    format: new GeoJSON(),
  }),
  style: activityStyle,
});

export function ActivityButton() {
  const [clicked, setClicked] = useState(true);
  const [activeFeature, setActiveFeature] = useState<
    activityStyle | undefined
  >();
  const { setActivityFeatureLayers, map } = useContext(MainContext);

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
      layerFilter: (l) => l === activityLayer,
    });
    if (features.length === 1) {
      setActiveFeature(features[0] as activityStyle);
      overlay.setPosition(e.coordinate);
    } else {
      setActiveFeature(undefined);
      overlay.setPosition(undefined);
    }
  }

  useEffect(() => {
    activeFeature?.setStyle(activeActivityStyle);
    return () => activeFeature?.setStyle(undefined);
  }, [activeFeature]);

  useEffect(() => {
    if (clicked) {
      setActivityFeatureLayers((old: any) => [...old, activityLayer]);
      map?.on("click", handlePointerMove);
    } else {
      setActivityFeatureLayers((old: any) =>
        old.filter((l: any) => l !== activityLayer),
      );
      map?.un("click", handlePointerMove);
    }
  }, [clicked, setActivityFeatureLayers, map]);

  return (
    <div
      className={`category-button ${clicked ? "clicked" : ""}`}
      onClick={() => setClicked((prevClicked) => !prevClicked)}
    >
      <img
        src="/images/activityPin_4.svg"
        alt="Activity"
        className="pin-icon"
        style={{ width: "3rem", height: "3rem" }}
      />
      <span>Activity</span>
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
