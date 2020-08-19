import React from "react";
import { FileContext } from "../../file_context";
import Map from "./map"
export default function Dashboard() {
  return (
    <FileContext.Consumer>
      {({ state }) => {
        console.log(state.file)
        return <Map />
      }}
    </FileContext.Consumer>
  );
}
