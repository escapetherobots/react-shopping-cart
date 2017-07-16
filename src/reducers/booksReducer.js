"use strict"

import {bookData} from '../localData/';

// DEFINE REDUCER
export const booksReducer = (state = {books: []}, action) => {
	switch(action.type){
		case "GET_BOOKS":
			return {...state, books: [...action.payload]}

		

		case "ADD_BOOK":
			return {
				...state, 
				books: [...state.books, action.payload],
				msg: 'Saved! Click to continue',
				style: 'success',
				validation: 'success'
			};

		case "ADD_BOOKS":
			return {...state, books: [...state.books, ...action.payload]};

		case "POST_BOOK_REJECTED":
			return {...state, msg: 'Please, try again', style: 'danger', validation: 'error'}

		case "RESET_BUTTON":
			return {...state, msg: null, style: null, validation: null}		

		

		
		case "DELETE_BOOK":
			var updatedList = state.books.filter( (item) => item._id !== action.payload);

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