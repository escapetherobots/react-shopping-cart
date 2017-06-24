"use strict"

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks } from '../../actions/bookActions';

import {Grid, Col, Row, Button} from 'react-bootstrap';

class BooksList extends Component {

	componentDidMount() {
		this.props.getBooks();
	}

	render(){
		const booksList = this.props.books.map( (item) => {
			return (
				<div key={item.id}>
					<h1>{item.title}</h1>
					<h2>{item.description}</h2>
					<h2>{item.price}</h2>
				</div>
			);
		})

		return (
			<div>
				<h1>Hello React</h1>
				{booksList}
			</div>
		);
	}
}


function mapStateToProps(state){
	return {
		books: state.books.books
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getBooks: getBooks
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);