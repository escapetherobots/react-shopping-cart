"use strict"

import React, { Component } from 'react';
import { Nav, NavItem, Navbar, Badge, NavDropdown, MenuItem } from 'react-bootstrap';

const navbar = (
  <Navbar inverse fixedTop collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">React-Bootstrap</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/About">About</NavItem>
        <NavItem eventKey={2} href="/contact">Contact Us</NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="/admin">Admin</NavItem>
        <NavItem eventKey={2} href="/cart">Cart <Badge className="badge">1</Badge></NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

class Menu extends Component{
	render(){
		return (
			<div>
				{navbar}
			</div>
		);
	}
}

export default Menu;