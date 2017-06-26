"use strict"

//CART REDUCERS
export const cartReducer = (state = {cart: []}, action) => {
	switch(action.type){
		case "ADD_TO_CART":
			return {cart: [...state.cart, action.payload]};

		case "REMOVE_FROM_CART":
			var updatedList = state.cart.filter( (item) => item._id !== action.payload._id);

			return {
				cart: [
					...updatedList
				]
			};
		
		case "UPDATE_CART_ITEM":
			
			let updatedCartItems = state.cart.map( (item) => {
				if(item._id === action._id){
					item.quantity += action.units;
					return item;
				} else {
					return item;
				}
			});

			console.log('updated cart: ', updatedCartItems);
			return {
				cart: [...updatedCartItems]
			};


		default:
			return state;

	}

	return state;

}