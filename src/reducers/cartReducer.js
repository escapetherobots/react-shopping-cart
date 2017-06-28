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
		case "ADD_TO_CART":
			const addedItemsList = [...state.cart, action.payload];

			return {
				cart: addedItemsList,
				totalAmount: totals(addedItemsList).amount,
				totalQty: totals(addedItemsList).qty
			};

		case "REMOVE_FROM_CART":
			const itemsNotRemoved = state.cart.filter( (item) => item._id !== action.payload._id);

			return {
				cart: itemsNotRemoved,
				totalAmount: totals(itemsNotRemoved).amount,
				totalQty: totals(itemsNotRemoved).qty
			};
		
		case "UPDATE_CART_ITEM":
			
			const updatedItemsList = state.cart.map( (item) => {
				if(item._id === action._id){
					item.quantity += action.units;
					return item;
				} else {
					return item;
				}
			});

			
			return {
				cart: updatedItemsList,
				totalAmount: totals(updatedItemsList).amount,
				totalQty: totals(updatedItemsList).qty
			};


		default:
			return state;

	}

	return state;

}


