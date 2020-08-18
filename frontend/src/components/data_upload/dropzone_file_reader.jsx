import React from "react";
import Dropzone from "react-dropzone";
import { FileConsumer } from "../../file_context";
import { SportsLib } from "@sports-alliance/sports-lib";

// Component allows users to drag and drop GPX file to upload
// GPX data is read and converted to an object that contains array of cordinates
// Data updates FileContext

export default function DropzoneFileReader() {
  const readAndUpdateFile = (fileObject, updateFile) => {
    const reader = new FileReader();
    reader.readAsText(fileObject);

    reader.onload = async () => {
      const parsedData = await parseData(reader.result);
      updateFile(parsedData);
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
    <FileConsumer>
      {({ updateFile }) => (
        <Dropzone
          onDrop={(newFileArray) => {
            readAndUpdateFile(newFileArray[0], updateFile);
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
                Upload GPX data by clicking to browse your files or drag and
                drop directly here!
              </h1>
            </div>
          )}
        </Dropzone>
      )}
    </FileConsumer>
  );
}
