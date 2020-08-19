import React from "react";
import { FileContext } from "../file_context";
import Dashboard from "./dashboard/dashboard";
import DataSanatizer from "./data_upload/data_sanitizer";

export default function ComponentSwitcher() {
  return (
    <FileContext.Consumer>
      {({ file }) => { 
        return file ? <Dashboard /> : <DataSanatizer />;
      }}
    </FileContext.Consumer>
  );
}
