// import { functions, isEqual, omit } from "lodash";
import useMap from "../../hooks/useMap_hook"
import usePolyline from "../../hooks/usePolyline_hook"
import React from "react";

export default function Map({ className }) {
  const [ref, map] = useMap();
  usePolyline(map);
  return <div id="map-container" {...{ ref, className }} />;
}

// function propsAndFunctionsAreEqual(props, nextProps) {
//   const [funcs, nextFuncs] = [functions(props), functions(nextProps)];
//   const noPropChange = isEqual(omit(props, funcs), omit(nextProps, nextFuncs));
//   const noFuncChange =
//     funcs.length === nextFuncs.length &&
//     funcs.every((fn) => props[fn].toString() === nextProps[fn].toString());
//   return noPropChange && noFuncChange;
// }

// export default React.memo(Map, propsAndFunctionsAreEqual);