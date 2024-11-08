import { Feature } from "ol";
import { Point } from "ol/geom";
import { FeatureLike } from "ol/Feature";
import { Icon, Style } from "ol/style";

export interface activityProperties {
  name: string;
}
export type activityStyle = {
  getproperties(): activityProperties;
} & Feature<Point>;
export const activityStyle = (feature: FeatureLike) => {
  const activity = feature.getProperties() as activityProperties;
  return new Style({
    image: new Icon({
      src: "/activityPin.png",
      anchor: [0.5, 1],
      scale: 0.05,
    }),
  });
};
export const activeActivityStyle = (feature: FeatureLike) => {
  const activity = feature.getProperties() as activityProperties;
  //const resolution = map.getView().getResolutions();
  return new Style({
    image: new Icon({
      src: "/activityPin.png",
      anchor: [0.5, 1],
      scale: 0.06,
    }),
  });
};
