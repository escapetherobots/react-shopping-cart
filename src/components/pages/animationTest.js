import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Panel } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class AnimationTest extends Component{
	render() {

		return (
			<div>
			    <ReactCSSTransitionGroup 
			    	transitionName="ztest" 
			    	transitionAppear={true} 
			    	transitionAppearTimeout={5000} 
			    	transitionEnter={false} 
			    	transitionLeave={false}>

			        <h2>{'PROTO SHOPPING CART'}</h2>

			    </ReactCSSTransitionGroup>
			</div>
		);
	}

}