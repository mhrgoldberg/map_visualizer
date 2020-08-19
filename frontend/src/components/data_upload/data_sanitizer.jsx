import React, { useContext } from "react";
import DropZoneComponent from "./dropzone";
import { SportsLib } from "@sports-alliance/sports-lib";
import { FileContext } from "../../file_context.js";
import DropzoneComponent from "./dropzone";

export default function DataSanatizer() {
  const { dispatch } = useContext(FileContext);
  const readAndUpdateFile = (fileObject) => {
    const reader = new FileReader();
    reader.readAsText(fileObject);
    reader.onload = async () => {
      if (reader.result.includes("gpx")) {
        const parsedData = await parseData(reader.result);
        const sanitizedData = sanitizeData(parsedData);
        dispatch({ type: "updateFile", payload: sanitizedData });
      } else {
        alert("Sorry, we can only accept GPX files");
      }
    };
    reader.onerror = () => {
      console.log(reader.error);
    };
  };

  const parseData = (dataString) => {
    return SportsLib.importFromGPX(dataString).then((event) => {
      return event.getActivities()[0];
    });
  };

  const combineLatLngs = (latTrack, lngTrack) => {
    const latLngs = [];
    for (let i = 0; i < latTrack.length; i++) {
      const lat = latTrack[i];
      const lng = lngTrack[i];
      if (lat !== null && lng != null) {
        latLngs.push({ lat, lng });
      }
    }
    return latLngs;
  };

  const sanitizeData = (parsedData) => {
    const tracks = parsedData.getAllStreams();
    const timeTrack = parsedData.generateTimeStream().data;
    const latTrack = tracks[0].data;
    const lngTrack = tracks[1].data;
    const elevation = tracks[2].data;

    const trackPoints = {
      latLngs: combineLatLngs(latTrack, lngTrack),
      elevation: elevation.filter((ele) => ele !== null),
      time: timeTrack.filter((ele) => ele !== null),
    };
    const distance = parsedData.getDistance().value;
    const duration = parsedData.getDuration().value;
    const ascent = parsedData.getStat("Ascent").value;
    const descent = parsedData.getStat("Descent").value;
    return {
      trackPoints,
      distance,
      duration,
      ascent,
      descent,
    };
  };

  return <DropZoneComponent readAndUpdateFile={readAndUpdateFile} />;
}
