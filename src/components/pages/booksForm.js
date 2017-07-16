"use strict"

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import axios from 'axios';

import { addBook, deleteBook, getBooks, resetButton } from '../../actions/bookActions';

import {Well, 
		MenuItem,
		Panel, 
		FormControl, 
		FormGroup, 
		ControlLabel, 
		Button, 
		InputGroup, 
		DropdownButton,
		Col,
		Row,
		Image,
		} from 'react-bootstrap';

class BooksForm extends Component{
	constructor(){
		super();
		this.state = {
			images: [{}],
			imgPath: ''
		}
	}

	componentDidMount(){
		// get books action
		this.props.getBooks();
		// get images from API
		axios.get('/api/images')
			.then(
				(response) => {
					this.setState({images:response.data});
				}
			)
			.catch(
				(err) => {
					this.setState({images: 'error loading image files from server', img: ''})
				}
			);
	}

	handleDelete(){
		let book = findDOMNode(this.refs.removeItem).value;

		this.props.deleteBook({_id: book});

	}

	handleSubmit(e){
		e.preventDefault();
		const book = {
			title: findDOMNode(this.refs.title).value,
			description: findDOMNode(this.refs.description).value,
			images: findDOMNode(this.refs.images).value,
			price: findDOMNode(this.refs.price).value,
		};

		this.props.addBook(book);
	}

	handleSelect(img){
		this.setState({
			img: '/images/' + img
		})
	}

	resetForm(){
		//reset button
		this.props.resetButton();
		//clear value of domNodes
		findDOMNode(this.refs.title).value = '';
		findDOMNode(this.refs.description).value = '';
		findDOMNode(this.refs.price).value = '';
		this.setState({
			img: ''
		})
	}


	render(){
		const modBooksList = [{title: 'Choose a book', _id: 0}, ...this.props.books]

		const booksList = modBooksList.map( (item, index) => {
			if(index === 0) {
				return (
					<option key={item._id} value="" placeholder="something" hidden>{item.title}</option>
				);
			} else {
				return (
					<option key={item._id} value={item._id}>{item.title}</option>
				);
			}
			
		});

		const imgList = this.state.images.map( (imgItem, i) => {
			return (
				<MenuItem 
					key={i}
					eventKey={imgItem.name}
					onClick={this.handleSelect.bind(this, imgItem.name)}
				>
					{imgItem.name}
				</MenuItem>
			)
		});


		return (
			<Well>
				<Row>
					<Col xs={12} sm={6}>
						<Panel>
							<InputGroup>
						        <FormControl type="text" ref="images" value={this.state.img} />
						        <DropdownButton
						          componentClass={InputGroup.Button}
						          id="input-dropdown-addon"
						          title="Select an Image"
						          bsStyle="primary"
						        >
						          {imgList}
						        </DropdownButton>
						      </InputGroup>
						      <Image src={this.state.img} responsive/>
						</Panel>
					</Col>
					<Col xs={12} sm={6}>
						<Panel>
							<FormGroup controlId="title" validationState={this.props.validation}>
								<ControlLabel>Title</ControlLabel>
								<FormControl
									type="text"
									placeholder="Enter Title"
									ref="title"
									required
								/>
								<FormControl.Feedback />
							</FormGroup>
							<FormGroup controlId="description" validationState={this.props.validation}>
								<ControlLabel>Description</ControlLabel>
								<FormControl
									type="text"
									placeholder="Enter Description"
									ref="description"
									required
								/>
								<FormControl.Feedback />
							</FormGroup>
							<FormGroup controlId="price" validationState={this.props.validation}>
								<ControlLabel>Price</ControlLabel>
								<FormControl
									type="text"
									placeholder="Enter Price"
									ref="price"
									required
								/>
								<FormControl.Feedback />
							</FormGroup>
							<Button onClick={ (!this.props.msg)? ( this.handleSubmit.bind(this) ) : (this.resetForm.bind(this)) } 
								bsStyle={(!this.props.style)? ("primary") : (this.props.style)}>
								{(!this.props.msg)? ("Add Book") : (this.props.msg)}
							</Button>
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
					
					</Col>
				</Row>
				
			</Well>
		);
	}
}

function mapStateToProps(state){
	return {
		books: state.books.books,
		msg: state.books.msg,
		style: state.books.style,
		validation: state.books.validation
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({addBook, deleteBook, getBooks, resetButton}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm); 