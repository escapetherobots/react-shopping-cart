import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideModal } from '../../actions/modalActions';

import {Button, Modal } from 'react-bootstrap';

class ModalComponent extends Component{
	constructor(props){
		super(props);

		this.state = {
			someTest: 'modal component state test'
		}

	}

	close(){
		this.props.hideModal();
	}

	render(){
		console.log('modal state: >>', this.state);
		const modalInstance = (
		  <div className="static-modal">
		    <Modal show={this.props.modal.showModal} onHide={this.close.bind(this)}>
	          <Modal.Header closeButton>
	            <Modal.Title>Modal heading</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>

	            {this.props.modal.modalContent}

	          </Modal.Body>
	          <Modal.Footer>
	            <Button onClick={this.close.bind(this)}>Close</Button>
	          </Modal.Footer>
	        </Modal>
		  </div>
		);


		return (
			<div>
				{modalInstance}
			</div>
		);
	}

}

function mapStateToProps(state){
	return {modal: state.modal}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({hideModal} , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);