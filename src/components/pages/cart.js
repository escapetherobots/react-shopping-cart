"use strict"
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { removeFromCart, updateCartItem } from '../../actions/cartActions';
import { updateModal } from '../../actions/modalActions';

import { Panel, Col, Row, Well, Button, ButtonGroup, Label } from 'react-bootstrap';

class Cart extends Component{

	onIncrement(_id){
		this.props.updateCartItem(_id, 1);
	}

	onDecrement(_id){
		let itemIndex = this.props.cart.findIndex( (item) => {
			return item._id === _id;
		});

		if(this.props.cart[itemIndex].quantity > 1){
			this.props.updateCartItem(_id, -1);
		} else {
			this.props.removeFromCart({_id});
		}
		
	}

	handleDelete(_id){
		this.props.removeFromCart({_id})
	}

	handleModal(){
		let modalContent = (
			<div>
				<h1>THANK YOU!</h1>
				<p>Your order has been processed.</p>
			</div>
		);

		this.props.updateModal(modalContent);
	}

	renderCart(){
		const cartItemsList = this.props.cart.map( (item) => {
			return (
				<Panel key={item.id}>
					<Row>
						<Col xs={12} sm={4}>
							<h6>{item.title}</h6><span>   </span>
						</Col>
						<Col xs={12} sm={2}>
							<h6>USD ${item.price}</h6>
						</Col>
						<Col xs={12} sm={2}>
							<h6>QTY <Label bsStyle="success" bsSize="medium">{item.quantity}</Label></h6>
						</Col>
						<Col xs={6} sm={4}>
							<ButtonGroup style={{minWidth: '300px'}}>
								<Button 
									onClick={this.onDecrement.bind(this, item._id)} 
									bsStyle="default" 
									bsSize="small">
									-
								</Button>
								<Button
									onClick={this.onIncrement.bind(this, item._id)}
									bsStyle="default"
									bsSize="small">
									+
								</Button>
								<span>   </span>
								<Button 
									onClick={this.handleDelete.bind(this, item._id)}
									bsStyle="danger"
									bsSize="small">
									Remove
								</Button>
							</ButtonGroup>
						</Col>
					</Row>
				</Panel>
			);
		});

		console.log('total amount: ', this.props.totalAmount);
		return (
			<Panel header="Cart" bsStyle="primary">
				{cartItemsList}
				<Row>
					<Col xs={12} md={3} mdPush={9} style={{textAlign: "right"}}>
						<h6>Total amount: 
							<span style={{fontSize: "24px"}}> ${this.props.totalAmount}</span>
						</h6>
						<Button onClick={this.handleModal.bind(this)} bsStyle="success" bsSize="small">Checkout</Button>
					</Col>
				</Row>
			</Panel>

		);
	}

	renderEmpty(){
		return (
			<Panel header="Cart" bsStyle="primary">
				<p>There are currently no items in your cart.</p>
			</Panel>
		);
	}

	render(){
		if(this.props.cart[0]){
			return this.renderCart();
		} else {
			return this.renderEmpty();
		}
	}
}


// REDUX HELPER FUNCTIONS
function mapStateToProps(state){
	return {
		cart: state.cart.cart,
		totalAmount: state.cart.totalAmount
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({removeFromCart, updateCartItem, updateModal}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);