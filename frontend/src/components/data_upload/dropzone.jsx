import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import gpsFileSanitizer from "./gps_file_sanitizer";
import { useContext } from "react";
import { FileContext } from "../../context/file_context";
import { SportsLib } from "@sports-alliance/sports-lib";

// Component allows users to drag and drop GPX file to upload
// GPX data is read, sanitized, and updates File
// Data updates FileContext

export default function DropZoneComponent() {
  const [rawFile, setRawFile] = useState(null);
  const { dispatch } = useContext(FileContext);

  useEffect(() => {
    if (rawFile !== null) {
      const reader = new FileReader();
      reader.readAsText(rawFile);
      reader.onload = () => {
        if (reader.result.includes("gpx")) {
          SportsLib.importFromGPX(reader.result)
            .then((parsedData) => {
              return new Promise((resolve, reject) => {
                const activities = parsedData.getActivities()[0];
                if (activities) {
                  resolve(gpsFileSanitizer(activities));
                } else {
                  reject(alert("file upload error"));
                }
              });
            })
            .then((sanitizedData) => {
              dispatch({ type: "updateFile", payload: sanitizedData });
            });
        } else {
          alert("Sorry, we can only accept GPX files");
        }
      };
    }
  }, [rawFile, dispatch]);

  return (
    <Dropzone
      onDrop={(newFileArray) => {
        setRawFile(newFileArray[0]);
      }}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          style={{
            borderColor: `${isDragActive ? "#09f7a0" : "#f8f9fa"}`,
            color: `${isDragActive ? "#09f7a0" : "#f8f9fa"}`,
          }}
          {...getRootProps()}
          id="upload-button"
        >
          <input {...getInputProps()} />
          <h1 className="upload-header">
            Upload GPX data by clicking to browse your files or drag and drop
            directly here!
          </h1>
        </div>
      )}
    </Dropzone>
  );
}
