import { functions, isEqual, omit } from "lodash";
import React, { useState, useEffect, useRef, useContext } from "react";
import { FileContext } from "../../file_context";
function Map({ onMount, className, onMountProps }) {
  const ref = useRef();
  const [map, setMap] = useState();
  const { state } = useContext(FileContext);
  const [options, setOptions] = useState({
    center: {
      lat: state.file.trackPoints.latLngs[0].lat,
      lng: state.file.trackPoints.latLngs[0].lng,
    },
    zoom: 15,
	});


  const addPolyline = () => {
			const latLngPath = state.file.trackPoints.latLngs
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
  };

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
	
	useEffect(() => {
		if (map) addPolyline();
	}, [map])

  if (map && typeof onMount === `function`) onMount(map, onMountProps);

  return <div id="map-container" {...{ ref, className }} />;
}

function propsAndFunctionsAreEqual(props, nextProps) {
  const [funcs, nextFuncs] = [functions(props), functions(nextProps)];
  const noPropChange = isEqual(omit(props, funcs), omit(nextProps, nextFuncs));
  const noFuncChange =
    funcs.length === nextFuncs.length &&
    funcs.every((fn) => props[fn].toString() === nextProps[fn].toString());
  return noPropChange && noFuncChange;
}

export default React.memo(Map, propsAndFunctionsAreEqual);
