import React from "react";
import { FileContext } from "../../file_context";
export default function Dashboard() {
  return <FileContext.Consumer>{({ file }) => {debugger;}}</FileContext.Consumer>;
}
