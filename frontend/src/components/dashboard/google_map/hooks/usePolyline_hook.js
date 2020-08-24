import { useEffect, useCallback, useContext } from "react";
import { FileContext } from "../../../../context/file_context";

export default function usePolyline(map) {
	const { state } = useContext(FileContext);
  const addPolyline = useCallback(() => {
    const latLngPath = state.file.trackPoints.latLngs;
    const workoutPath = new window.google.maps.Polyline({
      path: latLngPath,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.5,
      strokeWeight: 2,
    });
    const bounds = new window.google.maps.LatLngBounds();
    latLngPath.forEach((trackPoint) => bounds.extend(trackPoint));
    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);
    workoutPath.setMap(map);
  }, [state.file.trackPoints.latLngs, map]);

  useEffect(() => {
    if (map) addPolyline();
  }, [map, addPolyline]);
}
