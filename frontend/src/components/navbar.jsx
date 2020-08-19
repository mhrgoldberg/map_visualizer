import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FileContext } from "../file_context";

export default function NavBar() {
  const {state, dispatch} = useContext(FileContext);

  const noDataButtons = (
    <ButtonGroup>
      <Button variant="secondary">Download Sample Data</Button>
      <Button variant="secondary">View Sample Dashboard</Button>
    </ButtonGroup>
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
            <Navbar.Brand>Map Visualizer</Navbar.Brand>
            {state.file ? resetDataButton : noDataButtons}
          </span>
        </Navbar>
  );
}
