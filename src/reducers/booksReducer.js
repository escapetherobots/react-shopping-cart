"use strict"

import {bookData} from '../localData/';

// DEFINE REDUCER
export const booksReducer = (state = {books: bookData}, action) => {
	switch(action.type){
		case "GET_BOOKS":
			return {...state, books: [...state.books]}

		case "ADD_BOOK":
			return {books: [...state.books, action.payload]};

		case "ADD_BOOKS":
			return {books: [...state.books, ...action.payload]};

		case "DELETE_BOOK":
			console.log('book reducer', action.payload);
			var updatedList = state.books.filter( (item) => item._id !== action.payload._id);

			return {books: [...updatedList]};

		case "UPDATE_BOOK":
			var books = state.books.map( (item) => {
				if(item._id === action.payload._id){
					return {...item, description: action.payload.description}
				} else {
					return item;
				}
			});

			return {books: [...books]};


		default:
			return state;
	}

	return state;
}