import React, { useContext } from "react";
import DropZoneComponent from "./dropzone_file_reader";
import { SportsLib } from "@sports-alliance/sports-lib";
import { FileContext } from "../../file_context.js";
import DropzoneComponent from "./dropzone_file_reader";

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

  const sanitizeData = (parsedData) => {
    const tracks = parsedData.getAllStreams();
    const timeTrack = parsedData.generateTimeStream().data;
    const latTrack = tracks[0].data;
    const lngTrack = tracks[1].data;
    const elevation = tracks[2].data;

    const trackPoints = {
      lat: latTrack.filter((ele) => ele !== null),
      lng: lngTrack.filter((ele) => ele !== null),
      elevation: elevation.filter((ele) => ele !== null),
      time: timeTrack.filter((ele) => ele !== null),
    };
    const distance = parsedData.getDistance();
    const duration = parsedData.getDuration();
    const ascent = parsedData.getStat("Ascent");
    const descent = parsedData.getStat("Descent");
    return {
      trackPoints,
      distance,
      duration,
      ascent,
      descent,
    };
  };

  return <DropzoneComponent readAndUpdateFile={readAndUpdateFile} />;
}
