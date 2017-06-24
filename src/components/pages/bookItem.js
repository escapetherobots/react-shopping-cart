"use strict"

import React, {Component} from 'react';
import {Row, Col, Well, Button} from 'react-bootstrap';

class BookItem extends Component{
	
	render(){
		let {price, title, description} = this.props;

		return(
			<Well>
				<Row>
					<Col xs={12}>
						<h6>{title}</h6>
						<p>{description}</p>
						<h6>USD ${price}</h6>
						<Button bsStyle="primary">Buy Now</Button>
					</Col>
				</Row>
			</Well>
		);
	}
}

export default BookItem;