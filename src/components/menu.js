"use strict"

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, Navbar, Badge, NavDropdown, MenuItem, Button } from 'react-bootstrap';



class Menu extends Component{

  goToRoot(){
    browserHistory.push('/');
  }

	render(){
		return (
			<div>

          <Navbar inverse fixedTop collapseOnSelect>
            <Navbar.Header>
              
              <Navbar.Brand>
                <a style={{cursor: 'pointer'}} onClick={this.goToRoot}>
                  React-Bootstrap
                </a>
              </Navbar.Brand>
              
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="/about">About</NavItem>
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
                <LinkContainer to="/admin">
                  <NavItem eventKey={1}>Admin</NavItem>
                </LinkContainer>
                <LinkContainer to="/cart">
                  <NavItem eventKey={2}>Cart 
                    { (this.props.totalQty > 0)? (<Badge className="badge"> {this.props.totalQty}</Badge>) : ('')}
                  </NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

			</div>
		);
	}
}

function mapStateToProps(state){
  return {
    totalQty: state.cart.totalQty
  }
}

export default connect(mapStateToProps)(Menu);