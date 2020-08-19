import React, { useContext } from "react";
import Dropzone from "react-dropzone";

// Component allows users to drag and drop GPX file to upload
// GPX data is read and converted to an object that contains array of cordinates
// Data updates FileContext

export default function DropzoneFileReader({ readAndUpdateFile }) {

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
