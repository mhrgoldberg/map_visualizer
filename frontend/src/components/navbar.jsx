import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FileConsumer } from "../file_context";

export default function NavBar() {
  const noDataButtons = (
    <ButtonGroup>
      <Button variant="secondary">Download Sample Data</Button>
      <Button variant="secondary">View Sample Dashboard</Button>
    </ButtonGroup>
  );

  const resetDataButton = (updateFile) => (
    <Button variant="danger" onClick={() => updateFile(null)}>
      Upload New File
    </Button>
  );

  return (
    <FileConsumer>
      {({ file, updateFile }) => (
        <Navbar bg="primary" variant="dark">
          <span class="navbar-span">
            <Navbar.Brand>Map Visualizer</Navbar.Brand>
            {file ? resetDataButton(updateFile) : noDataButtons}
          </span>
        </Navbar>
      )}
    </FileConsumer>
  );
}
