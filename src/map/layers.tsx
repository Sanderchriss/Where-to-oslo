/*import { useContext, useEffect } from "react";
import { MainContext } from "./MainContext";
import { Layer } from "ol/layer";

export function CheckedLayers(layer: Layer, clicked: boolean) {
  const { setRestaurantFeatureLayers } = useContext(MainContext);
  useEffect(() => {
    if (clicked) {
      setCafeFeatureLayers((old) => [...old, layer]);
    }
    return () => {
      setCafeFeatureLayers((old) => old.filter((l) => l !== layer));
    };
  }, [clicked]);
}
*/
