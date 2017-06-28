"use strict"

// ADD TO CART
export const showModal = () => {
	return {
		type: "SHOW_MODAL",
	}
}

export const hideModal = () => {
	return {
		type: "HIDE_MODAL"
	}
}

export const updateModal = (/*jsx var*/content) => {
	console.log('action>>>', content);
	return {
		type: "UPDATE_MODAL",
		payload: content
	}
}
