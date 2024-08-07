import { Feature } from "ol";
import { Point } from "ol/geom";
import { FeatureLike } from "ol/Feature";
import { Icon, Style } from "ol/style";

export interface cafeProperties {
  name: string;
}
export type cafeStyle = {
  getproperties(): cafeProperties;
} & Feature<Point>;
export const cafeStyle = (feature: FeatureLike) => {
  const cafe = feature.getProperties() as cafeProperties;
  return new Style({
    image: new Icon({
      src: "/Where-to-oslo/kafePin.png",
      anchor: [0.5, 1],
      scale: 0.05,
    }),
  });
};
export const activeCafeStyle = (feature: FeatureLike) => {
  const cafe = feature.getProperties() as cafeProperties;
  //const resolution = map.getView().getResolutions();
  return new Style({
    image: new Icon({
      src: "/Where-to-oslo/kafePin.png",
      anchor: [0.5, 1],
      scale: 0.06,
    }),
  });
};
