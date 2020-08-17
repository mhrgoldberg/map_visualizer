import React from "react";
import Dropzone from "react-dropzone";
import { FileConsumer } from "../file_context";

export default function DropzoneComponent() {
  return (
    <FileConsumer>
      {({ updateFile }) => (
        <Dropzone
          onDrop={(newFile) => {
            updateFile(newFile);
          }}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              style={{
                border: `5px dashed ${isDragActive ? "green" : "white"}`,
                color: `${isDragActive ? "green" : "white"}`,
              }}
              {...getRootProps()}
              id="upload-button"
            >
              <input {...getInputProps()} />
              <h1 className="upload-header">
                Upload GPX data by clicking to browse your files or drag and
                drop here!
              </h1>
            </div>
          )}
        </Dropzone>
      )}
    </FileConsumer>
  );
}
