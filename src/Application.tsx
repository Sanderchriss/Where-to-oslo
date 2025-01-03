import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Application.css";
import "ol/ol.css";
import { MainContext, map } from "./map/MainContext";
import { Layer } from "ol/layer";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { ButtonsColumn } from "./buttons/ButtonsColumn";
import { BottomNavbar } from "./navbar/bottomNavbar";
import { MapboxVectorLayer } from "ol-mapbox-style";
import AdminPanel from "./admin/adminPanel";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export function Application() {
  const { map } = useContext(MainContext);
  const [featureLayers, setFeatureLayers] = useState<Layer[]>([]);
  const [cafeFeatureLayers, setCafeFeatureLayers] = useState<Layer[]>([]);
  const [drinkFeatureLayers, setDrinkFeatureLayers] = useState<Layer[]>([]);
  const [activityFeatureLayers, setActivityFeatureLayers] = useState<Layer[]>(
    [],
  );
  const [storeFeatureLayers, setStoreFeatureLayers] = useState<Layer[]>([]);
  const [restaurantFeatureLayers, setRestaurantFeatureLayers] = useState<
    Layer[]
  >([]);
  const [hikeFeatureLayers, setHikeFeatureLayers] = useState<Layer[]>([]);
  const mapboxKey = process.env.VITE_MAPBOX_KEY;
  const [baseLayer, setBaseLayer] = useState<Layer>(
    new MapboxVectorLayer({
      styleUrl: "mapbox://styles/sanderchriss/clulbulpb000701qz5d6qg5gf",
      accessToken: mapboxKey,
    }),
  );
  console.log("Mapbox Key:", process.env.VITE_MAPBOX_KEY);
  const layers = useMemo(
    () => [
      baseLayer,
      ...featureLayers,
      ...cafeFeatureLayers,
      ...drinkFeatureLayers,
      ...activityFeatureLayers,
      ...restaurantFeatureLayers,
      ...hikeFeatureLayers,
      ...storeFeatureLayers,
    ],
    [
      baseLayer,
      featureLayers,
      cafeFeatureLayers,
      drinkFeatureLayers,
      activityFeatureLayers,
      restaurantFeatureLayers,
      hikeFeatureLayers,
      storeFeatureLayers,
    ],
  );

  useEffect(() => map.setLayers(layers), [layers]);

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => map.setTarget(mapRef.current), []);
  useEffect(() => map.setLayers(layers), [layers]);

  return (
    <MainContext.Provider
      value={{
        map,
        setBaseLayer,
        featureLayers,
        setFeatureLayers,
        setCafeFeatureLayers,
        cafeFeatureLayers,
        setDrinkFeatureLayers,
        drinkFeatureLayers,
        storeFeatureLayers,
        setStoreFeatureLayers,
        activityFeatureLayers,
        setActivityFeatureLayers,
        restaurantFeatureLayers,
        setRestaurantFeatureLayers,
        hikeFeatureLayers,
        setHikeFeatureLayers,
      }}
    >
      <Router>
        <Routes>
          {/* Route for the Admin Panel */}
          <Route path="/admin" element={<AdminPanel />} />

          {/* Default route for your main application */}
          <Route
            path="/"
            element={
              <div>
                <main>
                  <div
                    ref={mapRef}
                    className="map map-container position-relative"
                  ></div>
                  <ButtonsColumn />
                  <div className="navbarContainer">
                    <BottomNavbar />
                  </div>
                </main>
              </div>
            }
          />
        </Routes>
      </Router>
    </MainContext.Provider>
  );
}
