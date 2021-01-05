import { useEffect, useCallback, useContext } from "react";
import { util } from "./polyline_util";
import { FileContext } from "../../../../context/file_context";

export default function usePolyline(map) {
  const { state } = useContext(FileContext);
  const latLngs = state.file.trackPoints.latLngs;

  const addPolyline = useCallback(
    util.createPathCallback(map, latLngs, "#FF0000"),
    [latLngs, map]
  );

  const setBounds = useCallback(util.setBoundsCallback(map, latLngs), [
    latLngs,
    map,
  ]);

  useEffect(() => {
    if (map) {
      setBounds();
      addPolyline();
    }
  }, [map, addPolyline, setBounds]);
}
