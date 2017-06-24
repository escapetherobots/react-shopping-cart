"use strict"

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks } from '../../actions/bookActions';

import BookItem from './bookItem';
import BooksForm from './booksForm'

import {Grid, Col, Row, Button} from 'react-bootstrap';

class BooksList extends Component {

	componentDidMount() {
		this.props.getBooks();
	}

	render(){
		const bookListStyles = {
			test: {
				color: 'blue',
		  		// backgroundImage: 'url(' + imgUrl + ')',
			},
			row: {
				marginTop: '15px',
			}
		  
		}


		const booksList = this.props.books.map( (item) => {
			return (
				<div key={item.id}>
					<BookItem 
						id={item.id}
						title={item.title}
						description={item.description}
						price={item.price}
					/>
				</div>
			);
		})

		return (
			<Grid>
				<Row style={bookListStyles.row}>
					<Col xs={12} sm={6}>
						<BooksForm />
					</Col>
					<Col xs={12} sm={6} md={4} >
						{booksList}
					</Col>
				</Row>
				
			</Grid>
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