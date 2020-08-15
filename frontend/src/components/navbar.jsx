import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Dropzone from "./dropzone"

const NavBar = (props) => {
  return (
	<Navbar bg="primary" variant="dark">
    <Navbar.Brand>Map Visualizer</Navbar.Brand>
		<Dropzone />
  </Navbar>
  );
};

export default NavBar;