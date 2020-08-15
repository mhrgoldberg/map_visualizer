import React from 'react'
import { Button, Nav, Navbar, ButtonGroup } from "react-bootstrap";

const NavBar = (props) => {
  return (
	<Navbar bg="dark" variant="dark">
    <Navbar.Brand>Map Visualizer</Navbar.Brand>
		<Button>Upload File</Button>
  </Navbar>
  );
};

export default NavBar;