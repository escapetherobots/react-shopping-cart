"use strict"

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

//COMPONENTS
import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';
import AnimationTest from './animationTest';
import Modal from './modal';

//ACTIONS
import { getBooks } from '../../actions/bookActions';

import {Carousel,Grid, Col, Row, Button} from 'react-bootstrap';

const carouselInstance = (
  <Carousel>
    <Carousel.Item>
      <img width={900} height={300} alt="900x500" src="/images/book1.jpg"/>
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img width={900} height={300} alt="900x500" src="/images/book2.jpg"/>
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img width={900} height={300} alt="900x500" src="/images/book3.jpg"/>
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);


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
			},
			toprow: {
				textAlign: 'center',
			},
			truncate: {
				width: '100px',
  				whiteSpace: 'nowrap',
  				overflow: 'hidden',
  				textOverflow: 'ellipsis'
			}

		  
		}


		const booksList = this.props.books.map( (item) => {
			return (
				<Col xs={12} sm={6} key={item._id}>
					<BookItem 
						_id={item._id}
						title={item.title}
						description={item.description}
						images={item.images}
						price={item.price}
					/>
				</Col>
			);
		})

		return (
			<Grid>
				<Row style={bookListStyles.toprow}>
					<Col >
						<AnimationTest />
					</Col>
				</Row>
				<Row>
					{carouselInstance}
				</Row>
				<Row style={bookListStyles.row}>
					<Col >
						<Cart />
					</Col>
				</Row>
				<Row style={bookListStyles.row}>
					{booksList}
				</Row>
				<Row>
					<Modal />
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