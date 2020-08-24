import React from "react";
import NavBar from "./components/navbar";
import ComponentSwitcher from "./components/component_switcher";
import { FileProvider } from "./context/file_context";
import "./scss/App.scss";


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
