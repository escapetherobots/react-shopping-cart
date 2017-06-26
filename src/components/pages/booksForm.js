"use strict"

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';

import { addBook } from '../../actions/bookActions';

import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';

class BooksForm extends Component{

	handleSubmit(e){
		e.preventDefault();
		const book = {
			title: findDOMNode(this.refs.title).value,
			description: findDOMNode(this.refs.description).value,
			price: findDOMNode(this.refs.price).value,
		};

		this.props.addBook(book);
	}

	render(){
		return (
			<Well>
				<Panel>
					<FormGroup controlId="title">
						<ControlLabel>Title</ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Title"
							ref="title"
							required
						/>
					</FormGroup>
					<FormGroup controlId="description">
						<ControlLabel>Description</ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Description"
							ref="description"
							required
						/>
					</FormGroup>
					<FormGroup controlId="price">
						<ControlLabel>Price</ControlLabel>
						<FormControl
							type="text"
							placeholder="Enter Price"
							ref="price"
							required
						/>
					</FormGroup>
					<Button onClick={ this.handleSubmit.bind(this) } bsStyle="primary">Save book</Button>
				</Panel>
			</Well>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({addBook}, dispatch);
}

//args = mapStateToProps, mapDispatchToProps
export default connect(null, mapDispatchToProps)(BooksForm); 