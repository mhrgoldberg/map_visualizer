import React, { useContext } from "react";
import Dropzone from "react-dropzone";
import { SportsLib } from "@sports-alliance/sports-lib";
import { FileContext } from "../../file_context.js";
// Component allows users to drag and drop GPX file to upload
// GPX data is read and converted to an object that contains array of cordinates
// Data updates FileContext

export default function DropzoneFileReader({ sanitizeData }) {
  
  const { updateFile } = useContext(FileContext);

  const readAndUpdateFile = (fileObject) => {
    const reader = new FileReader();
    reader.readAsText(fileObject);
    reader.onload = async () => {
      const parsedData = await parseData(reader.result);
      const sanitizedData = sanitizeData(parsedData);
      updateFile(sanitizedData);
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

  return (
    <Dropzone
      onDrop={(newFileArray) => {
        readAndUpdateFile(newFileArray[0]);
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
