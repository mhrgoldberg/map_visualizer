export const util = {
  createPathCallback: (map, latLngs, strokeColor) => {
    return () => {
      const workoutPath = new window.google.maps.Polyline({
        path: latLngs,
        geodesic: true,
        strokeColor,
        strokeOpacity: 1.5,
        strokeWeight: 2,
      });
      workoutPath.setMap(map);
    };
  },
  setBoundsCallback: (map, latLngs) => {
    return () => {
      const bounds = new window.google.maps.LatLngBounds();
      latLngs.forEach((trackPoint) => bounds.extend(trackPoint));
      map.setCenter(bounds.getCenter());
      map.fitBounds(bounds);
    };
  },
};
