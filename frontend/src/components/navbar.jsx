import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/button";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FileContext } from "../context/file_context";

// onClick={dispatch({type: "update", payload: "" })}

export default function NavBar() {
  const { state, dispatch } = useContext(FileContext);

  const noDataButtons = (
    <span className="dual-buttons">
      <a
        className="btn btn-primary nav-bar-button"
        href={`${process.env.PUBLIC_URL} + /gpx_files/sample.gpx`}
        download
      >
        Download
      </a>
      <Button variant="secondary">View Sample Dashboard</Button>
    </span>
  );

  const resetDataButton = (
    <Button
      variant="danger"
      onClick={() => {
        dispatch({ type: "reset" });
      }}
    >
      Upload New File
    </Button>
  );

  return (
    <Navbar bg="primary" variant="dark">
      <span className="navbar-span">
        <Navbar.Brand>Elevation Visualizer</Navbar.Brand>
        {state.file ? resetDataButton : noDataButtons}
      </span>
    </Navbar>
  );
}
