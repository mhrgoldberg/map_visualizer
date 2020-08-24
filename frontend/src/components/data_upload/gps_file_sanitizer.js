export default function gpsFileSanitizer(data) {
  const sanitizeData = (parsedData) => {
    const tracks = parsedData.getAllStreams();
    const latTrack = tracks[0].data;
    const lngTrack = tracks[1].data;
    const elevationTrack = tracks[2].data;
    const timeTrack = parsedData.generateTimeStream().data;
    const distance = parsedData.getDistance().value;
    const duration = parsedData.getDuration().value;
    const ascent = parsedData.getStat("Ascent").value;
    const descent = parsedData.getStat("Descent").value;

    const trackPoints = {
      latLngs: combineLatLngs(latTrack, lngTrack),
      elevation: elevationTrack.filter((ele) => ele !== null),
      time: timeTrack.filter((ele) => ele !== null),
    };

    return {
      trackPoints,
      distance,
      duration,
      ascent,
      descent,
    };
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
  return sanitizeData(data);
}

