"use strict"

// ADD TO CART
export const addToCart = (/*Obj*/book) => {
	return {
		type: "ADD_TO_CART",
		payload: book
	}
}

// REMOVE FROM CART
export const removeFromCart = (/*obj id*/_id) => {
	return {
		type: "REMOVE_FROM_CART",
		payload: _id
	}
}


//UPDATE CART
export const updateCartItem = (/**/_id, units) => {
	return {
		type: "UPDATE_CART_ITEM",
		_id,
		units
	}
}