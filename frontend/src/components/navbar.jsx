import React from 'react'
import { Button, Nav, Navbar, ButtonGroup } from "react-bootstrap";
import Dropzone from "./dropzone"

const NavBar = (props) => {
  return (
	<Navbar bg="dark" variant="dark">
    <Navbar.Brand>Map Visualizer</Navbar.Brand>
		<Dropzone />
  </Navbar>
  );
};

export default NavBar;