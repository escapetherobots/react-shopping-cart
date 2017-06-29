"use strict"

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Menu from './components/menu';
import Footer from './components/footer';

class Main extends Component {

	render(){
		return(
			<div>
				<Menu />
					{this.props.children}
				<Footer />
			</div>
		);
	}

}

export default Main;