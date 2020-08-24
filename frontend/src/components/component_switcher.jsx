import React from "react";
import { FileContext } from "../context/file_context";
import Dashboard from "./dashboard/dashboard";
import DropzoneComponent from "./data_upload/dropzone";

export default function ComponentSwitcher() {
  return (
    <FileContext.Consumer>
      {({ state }) => { 
        return state.file ? <Dashboard /> : <DropzoneComponent />;
      }}
    </FileContext.Consumer>
  );
}
