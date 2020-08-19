import React from "react";
import NavBar from "./components/navbar";
import ComponentSwitcher from "./components/component_switcher";
import { FileProvider } from "./file_context";
import "./scss/App.scss";

console.log(process.env.REACT_APP_GOOGLE_API_KEY)

export default function App() {
  return (
    <div className="App">
      <FileProvider>
        <NavBar />
        <ComponentSwitcher />
      </FileProvider>
    </div>
  );
}
