import React from "react";
import { FileConsumer } from "../file_context";
import Dashboard from "./dashboard";
import DropzoneComponent from "./dropzone";

export default function ComponentSwitcher() {
  return (
    <FileConsumer>
      {({ file }) => {
        return file ? <Dashboard /> : <DropzoneComponent />;
      }}
    </FileConsumer>
  );
}
