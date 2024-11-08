import { Feature } from "ol";
import { Point } from "ol/geom";

import { Style, Icon } from "ol/style";

export interface hikeProperties {
  name: string;
  image: string;
}
export type hikeStyle = {
  getproperties(): hikeProperties;
} & Feature<Point>;
export const hikeStyle = () => {
  return new Style({
    image: new Icon({
      src: "/images/tripPin.svg",
      anchor: [0.5, 1],
      scale: 0.4,
    }),
  });
};
export const activeHikeStyle = () => {
  //const resolution = map.getView().getResolutions();
  return new Style({
    image: new Icon({
      src: "/images/tripPin.svg",
      anchor: [0.5, 1],
      scale: 0.5,
    }),
  });
};
