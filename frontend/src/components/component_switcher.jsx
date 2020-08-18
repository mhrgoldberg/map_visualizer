import React from "react";
import { FileConsumer } from "../file_context";
import Dashboard from "./dashboard/dashboard";
import DropzoneFileReader from "./data_upload/dropzone_file_reader";

export default function ComponentSwitcher() {
  return (
    <FileConsumer>
      {({ file }) => { 
        return file ? <Dashboard file={file} /> : <DropzoneFileReader />;
      }}
    </FileConsumer>
  );
}
