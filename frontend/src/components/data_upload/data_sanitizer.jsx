import React from "react";
import DropzoneFileReader from "./dropzone_file_reader";


export default function DataSanatizer() {

  const sanitizeData = (parsedData) => {
    const tracks = parsedData.getAllStreams()
    const timeTrack = parsedData.generateTimeStream().data
    const latTrack = tracks[0].data;
    const lngTrack = tracks[1].data;
    const elevation = tracks[2].data;
    
    const trackPoints = {
      lat: latTrack.filter(ele => ele !== null),
      lng: lngTrack.filter(ele => ele !== null),
      elevation: elevation.filter(ele => ele !== null),
      time: timeTrack.filter(ele => ele !== null)
    }
    const distance = parsedData.getDistance()
    const duration = parsedData.getDuration()
    const ascent = parsedData.getStat("Ascent");
    const descent = parsedData.getStat("Descent");
    return {
      trackPoints,
      distance,
      duration,
      ascent,
      descent
    };
  };

  return <DropzoneFileReader sanitizeData={sanitizeData} />;
}
