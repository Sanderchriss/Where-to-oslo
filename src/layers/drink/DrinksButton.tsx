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
import { activeDrinkStyle, drinkStyle } from "./DrinkStyle";
import "../../css/BottomNavbar.css";
import AddFavoriteButton from "../../buttons/addFavoriteButton";

const drinkLayer = new VectorLayer({
  className: "Drink",
  source: new VectorSource({
    url: "/json/drinks.geojson",
    format: new GeoJSON(),
  }),
  style: drinkStyle,
});

export function DrinksButton() {
  const [clicked, setClicked] = useState(true);
  const [activeFeature, setActiveFeature] = useState<drinkStyle | undefined>();
  const { setDrinkFeatureLayers, map } = useContext(MainContext);

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
      layerFilter: (l) => l === drinkLayer,
    });
    if (features.length === 1) {
      setActiveFeature(features[0] as drinkStyle);
      overlay.setPosition(e.coordinate);
    } else {
      setActiveFeature(undefined);
      overlay.setPosition(undefined);
    }
  }

  useEffect(() => {
    activeFeature?.setStyle(activeDrinkStyle);
    return () => activeFeature?.setStyle(undefined);
  }, [activeFeature]);

  useEffect(() => {
    if (clicked) {
      setDrinkFeatureLayers((old: any) => [...old, drinkLayer]);
      map?.on("click", handlePointerMove);
    } else {
      setDrinkFeatureLayers((old: any) =>
        old.filter((l: any) => l !== drinkLayer),
      );
      map?.un("click", handlePointerMove);
    }
  }, [clicked, setDrinkFeatureLayers, map]);

  return (
    <div
      className={`category-button ${clicked ? "clicked" : ""}`}
      onClick={() => setClicked((prevClicked) => !prevClicked)}
    >
      <img
        src="/images/beerPin.svg"
        alt="Drink"
        className="pin-icon"
        style={{ width: "3rem", height: "3rem" }}
      />
      <span>Bar</span>
      <div ref={overlayRef} className={"pinOverlay"}>
        {activeFeature && (
          <div className="container-box">
            <p>
              <b>{activeFeature.get("name")}</b>
            </p>
            <p>
              spesialiserer seg i øl, og har en hel tavle med en hel masse
              forskjellige typer øl. <br /> Her kan man spille shuffleboard, så
              er perfekt for en første date, <br /> vennegjeng som trenger noe å
              gjøre en fredagskveld eller lønningspils med jobben. <br />{" "}
              Romslig og chill atmosfære.
            </p>
            <AddFavoriteButton
              feature={{
                id: activeFeature.get("id"),
                name: activeFeature.get("name"),
                description: activeFeature.get("description"),
                ...activeFeature,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
