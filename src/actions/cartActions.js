"use strict"
import axios from 'axios';

// GET CART
export const getCart = () => {
	return (dispatch, getState) => {
		axios.get('/api/cart')
			.then(
				(response) => {
					dispatch({
						type: "GET_CART",
						payload: response.data
					});
				}
			)
			.catch( (err) => {
				dispatch({type: "GET_CART_REJECTED", msg: 'get cart->', err});
			});
	}
}



// ADD TO CART
export const addToCart = (/*obj*/bookObj) => {
	return (dispatch, getState) => {
		const updatedList = [
			...getState().cart.cart,
			bookObj
		];

		axios.post('/api/cart', updatedList)
			.then(
				(response) => {
					dispatch({
						type: "ADD_TO_CART",
						payload: response.data
					});
				},
				(err) => {
					console.log('addToCart action axios error', err);
				}
			)
			.catch( (err) => {
				dispatch({type: "ADD_TO_CART_REJECTED", payload: 'error->', err});
			});
	}
	// return {
	// 	type: "ADD_TO_CART",
	// 	payload: book
	// }
}

//UPDATE CART
export const removeFromCart = (/**/_id) => {

	return (dispatch, getState) => {
		const currentCart = getState().cart.cart;
		const modCart = currentCart.filter( (item) => {
			return item._id !== _id;
		});

		axios.post('/api/cart', modCart)
			.then( (response) => {
				dispatch({
					type: "REMOVE_FROM_CART",
					payload: response.data
				});
			})
			.catch( (err) => {
				dispatch({type: "REMOVE_FROM_CART_REJECTED", msg: 'error when updating cart'});
			});
	}

}


//UPDATE CART
export const updateCartItem = (/**/_id, units) => {

	return (dispatch, getState) => {
		const currentCart = getState().cart.cart;
		const modCart = currentCart.map( (item) => {
			if(item._id === _id){
				return {...item, quantity: item.quantity + units};
			} else {
				return {...item};
			}
		});
		axios.post('/api/cart', modCart)
			.then( (response) => {
				dispatch({
					type: "UPDATE_CART_ITEM",
					payload: response.data
				});
			})
			.catch( (err) => {
				dispatch({type: "UPDATE_CART_ITEM_REJECTED", msg: 'error when updating cart'});
			});
	}

}