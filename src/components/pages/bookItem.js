"use strict"

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, updateCartItem } from '../../actions/cartActions';

import {Row, Col, Well, Button, Image} from 'react-bootstrap';

class BookItem extends Component{

	constructor(props){
		super(props);
		this.handleAddToCart = this.handleAddToCart.bind(this);

		this.state = {
			isClicked: false
		};
	}

	onReadMore(){
		this.setState({isClicked: true});
	}

	// ADD AN ITEM TO THE CART
	handleAddToCart(e){
		e.preventDefault();

		const book = {
				_id: this.props._id,
				title: this.props.title,
				description: this.props.description,
				images: this.props.images,
				price: this.props.price,
				quantity: 1
		};

		//CHECK IF CART IS EMPTY
		if(this.props.cart.length > 0){
			let _id = this.props._id;

			let cartItemIndex = this.props.cart.findIndex( (item) => {
				return item._id === _id;
			});

			// -1 means not found on a findIndex method
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
		const bookItemStyles = {
			para: {
				width: '200px',
  				
  				
			}

		  
		}

		let {price, title, description} = this.props;

		return(
			<Well>
				<Row>
					<Col xs={12} sm={4}>
						<Image src={this.props.images} responsive/>
					</Col>
					<Col xs={12} sm={8}>
						<h6>{title}</h6>
						<p style={bookItemStyles.para}>
							{(description.length > 50 && this.state.isClicked === false )? ( description.substring(0, 50) ) : (description)}
							<button className="link" onClick={this.onReadMore.bind(this)}>
								{(this.state.isClicked === false && description !== null && description.length > 50)? ('Read More') : ('')}
							</button>
						</p>
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