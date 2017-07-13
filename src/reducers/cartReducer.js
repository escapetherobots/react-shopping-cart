"use strict"

// CALCULATE TOTALS
export function totals(itemArr){

	const totalAmount = itemArr.map( (item) => {
		return item.price * item.quantity;
	}).reduce( (a,b) => {
		return a + b;
	}, 0); // start summing from index 0;


	const totalQty = itemArr.map( (item) => {
		return item.quantity;
	}).reduce( (a,b) => {
		return a + b;
	}, 0) // start summing qty of all items from index 0;

	return {
		amount: totalAmount.toFixed(2),
		qty: totalQty
	};
}


//CART REDUCERS
export const cartReducer = (state = {cart: []}, action) => {
	switch(action.type){
		case "GET_CART":
			return {
				...state,
				cart: action.payload,
				totalAmount: totals(action.payload).amount,
				totalQty: totals(action.payload).qty
			};


		case "ADD_TO_CART":
			return {
				...state,
				cart: action.payload, //should be an array
				totalAmount: totals(action.payload).amount,
				totalQty: totals(action.payload).qty
			};

		case "REMOVE_FROM_CART":
			return {
				...state,
				cart: action.payload, //should be an array
				totalAmount: totals(action.payload).amount,
				totalQty: totals(action.payload).qty
			};
		
		case "UPDATE_CART_ITEM":
			return {
				...state,
				cart: action.payload, //should be an array
				totalAmount: totals(action.payload).amount,
				totalQty: totals(action.payload).qty
			};


		default:
			return state;

	}

	return state;

}


