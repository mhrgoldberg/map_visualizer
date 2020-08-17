import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function NavBar() {
  

  return (
    <Navbar bg="primary" variant="dark">
      <span class="navbar-span">
        <Navbar.Brand>Map Visualizer</Navbar.Brand>
        <ButtonGroup>
          <Button variant="secondary">Download Sample Data</Button>
          <Button variant="secondary">Sample Dashboard</Button>
        </ButtonGroup>
      </span>
    </Navbar>
  );
}
