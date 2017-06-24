"use strict"

import React, { Component } from 'react';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';

class BooksForm extends Component{
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
					<Button bsStyle="primary">Save book</Button>
				</Panel>
			</Well>
		);
	}
}

export default BooksForm;