import { Feature } from "ol";
import { Point } from "ol/geom";
import { FeatureLike } from "ol/Feature";
import { Icon, Style } from "ol/style";

export interface storeProperties {
  name: string;
}
export type storeStyle = {
  getproperties(): storeProperties;
} & Feature<Point>;
export const storeStyle = (feature: FeatureLike) => {
  const store = feature.getProperties() as storeProperties;
  return new Style({
    image: new Icon({
      src: "/images/storePin_2.svg",
      anchor: [0.5, 1],
      scale: 0.5,
    }),
  });
};
export const activeStoreStyle = (feature: FeatureLike) => {
  const store = feature.getProperties() as storeProperties;
  //const resolution = map.getView().getResolutions();
  return new Style({
    image: new Icon({
      src: "/images/storePin_2.svg",
      anchor: [0.5, 1],
      scale: 0.6,
    }),
  });
};
