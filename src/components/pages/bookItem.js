"use strict"

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, updateCartItem } from '../../actions/cartActions';

import {Row, Col, Well, Button} from 'react-bootstrap';

class BookItem extends Component{

	constructor(props){
		super(props);
		this.handleAddToCart = this.handleAddToCart.bind(this);
	}

	// ADD AN ITEM TO THE CART
	handleAddToCart(e){
		e.preventDefault();

		const book = {
			_id: this.props._id,
			title: this.props.title,
			description: this.props.description,
			price: this.props.price,
			quantity: 1
		};

		//CHECK IF CART IS EMPTY
		if(this.props.cart.length > 0){
			let _id = this.props._id;

			let cartItemIndex = this.props.cart.findIndex( (item) => {
				return item._id === _id;
			});

			if(cartItemIndex === -1){
				this.props.addToCart(book);
			} else {
				this.props.updateCartItem(_id, 1);
			}

		} else {
			// CART IS EMPTY
			// SUBMIT THE ACTION
			this.props.addToCart(book);
		}

		
		
	}
	
	render(){
		let {price, title, description} = this.props;

		return(
			<Well>
				<Row>
					<Col xs={12}>
						<h6>{title}</h6>
						<p>{description}</p>
						<h6>USD ${price}</h6>
						<Button onClick={this.handleAddToCart} bsStyle="primary">Buy Now</Button>
					</Col>
				</Row>
			</Well>
		);
	}
}

function mapStateToProps(state){
	return {
		cart: state.cart.cart
	};
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({addToCart, updateCartItem}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);