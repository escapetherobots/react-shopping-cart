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
export const updateCartItem = (/**/_id, units, cartArr) => {
	const currentCart = cartArr;

	const updatedCart = currentCart.map( (item) => {
		if( item._id === _id) {
			let newQty = item.quantity + units;
			return {...item, quantity: newQty};
		} else {
			return {...item}
		}
	});

	return {
		type: "UPDATE_CART_ITEM",
		payload: updatedCart
	}
}