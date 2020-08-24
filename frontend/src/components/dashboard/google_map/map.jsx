import useMap from "./hooks/useMap_hook";
import usePolyline from "./hooks/usePolyline_hook";
import React from "react";

export default function Map({ className }) {
  //  component adds div to the DOM for useMap and usePolyline to render map in
  const [ref, map] = useMap();
  usePolyline(map);
  return <div id="map-container" {...{ ref, className }} />;
}
