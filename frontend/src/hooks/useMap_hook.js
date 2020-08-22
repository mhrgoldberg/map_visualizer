import { useState, useEffect, useRef, useContext } from "react";

import { FileContext } from "../file_context";

export default function useMap() {
  const ref = useRef();
  const [map, setMap] = useState();
  const { state } = useContext(FileContext);
  const [options] = useState({
    center: {
      lat: state.file.trackPoints.latLngs[0].lat,
      lng: state.file.trackPoints.latLngs[0].lng,
    },
    zoom: 15,
  });

  useEffect(() => {
    const onLoad = () =>
      setMap(new window.google.maps.Map(ref.current, { ...options }));
    if (!window.google) {
      const script = document.createElement(`script`);
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=` +
        process.env.REACT_APP_GOOGLE_API_KEY;
      document.head.append(script);
      script.addEventListener(`load`, onLoad);
      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  }, [options]);

  return [ref, map];
}
