"use strict"

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';

import { addBook, deleteBook } from '../../actions/bookActions';

import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';

class BooksForm extends Component{

	handleDelete(){
		let book = findDOMNode(this.refs.removeItem).value;

		this.props.deleteBook({_id:+book});

	}

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
		const modBooksList = [{title: 'Choose a book', _id: 0}, ...this.props.books]

		const booksList = modBooksList.map( (item, index) => {
			if(index === 0) {
				return (
					<option value="" placeholder="something" hidden>{item.title}</option>
				);
			} else {
				return (
					<option value={item._id}>{item.title}</option>
				);
			}
			
		})


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
				<Panel style={{marginTop: '25px'}}>
					<FormGroup controlId="formControlsSelect">
						<ControlLabel>Select a book to remove</ControlLabel>
						<FormControl ref="removeItem" componentClass="select" placeholder="select">
							{booksList}
						</FormControl>
					</FormGroup>
					<Button onClick={this.handleDelete.bind(this)} bsStyle="danger" >Remove Book</Button>
				</Panel>
			</Well>
		);
	}
}

function mapStateToProps(state){
	return {
		books: state.books.books
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({addBook, deleteBook}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm); 