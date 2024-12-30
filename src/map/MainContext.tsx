import React, { Dispatch, SetStateAction } from "react";
import { Layer } from "ol/layer";
import { Map, View } from "ol";
import { useGeographic } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { MapboxVectorLayer } from "ol-mapbox-style";

useGeographic();
const mapboxKey = process.env.VITE_MAPBOX_KEY;
export const map = new Map({
  layers: [
    new MapboxVectorLayer({
      styleUrl: "mapbox://styles/sanderchriss/clulbulpb000701qz5d6qg5gf",
      accessToken: mapboxKey,
    }),
  ],
  view: new View({ center: [10.7522454, 59.9138688], zoom: 12 }),
});

export const MainContext = React.createContext<{
  map: Map;
  setBaseLayer: (layer: Layer) => void;
  setFeatureLayers: Dispatch<SetStateAction<Layer[]>>;
  featureLayers: Layer[];
  setCafeFeatureLayers: Dispatch<SetStateAction<Layer[]>>;
  cafeFeatureLayers: Layer[];
  setDrinkFeatureLayers: Dispatch<SetStateAction<Layer[]>>;
  drinkFeatureLayers: Layer[];
  setActivityFeatureLayers: Dispatch<SetStateAction<Layer[]>>;
  activityFeatureLayers: Layer[];
  setStoreFeatureLayers: Dispatch<SetStateAction<Layer[]>>;
  storeFeatureLayers: Layer[];
  setRestaurantFeatureLayers: Dispatch<SetStateAction<Layer[]>>;
  restaurantFeatureLayers: Layer[];
  setHikeFeatureLayers: Dispatch<SetStateAction<Layer[]>>;
  hikeFeatureLayers: Layer[];
}>({
  map,
  setBaseLayer: () => {},
  setFeatureLayers: () => {},
  featureLayers: [],
  setCafeFeatureLayers: () => {},
  cafeFeatureLayers: [],
  setDrinkFeatureLayers: () => {},
  drinkFeatureLayers: [],
  setActivityFeatureLayers: () => {},
  activityFeatureLayers: [],
  setStoreFeatureLayers: () => {},
  storeFeatureLayers: [],
  setRestaurantFeatureLayers: () => {},
  restaurantFeatureLayers: [],
  setHikeFeatureLayers: () => {},
  hikeFeatureLayers: [],
});
