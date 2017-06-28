"use strict"

//MODAL REDUCERS
export const modalReducer = (state = {showModal: false, modalContent: undefined}, action) => {
	switch(action.type){
		case "SHOW_MODAL":
			return {...state, showModal: true};

		case "HIDE_MODAL":
			return {...state, showModal: false};

		case "UPDATE_MODAL":
			console.log('reducer>>>', action.payload);
			return {
				showModal: true,
				modalContent: action.payload		
			};

		default:
			return state;

	}

	return state;

}