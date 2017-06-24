"use strict"

// DEFINE REDUCER
export const booksReducer = (state = {books: []}, action) => {
	switch(action.type){
		case "ADD_BOOK":
			return {books: [...state.books, action.payload]};

		case "ADD_BOOKS":
			return {books: [...state.books, ...action.payload]};

		case "DELETE_BOOK":
			var updatedList = state.books.filter( (item) => item.id !== action.payload.id);

			return {books: [...updatedList]};

		case "UPDATE_BOOK":
			var books = state.books.map( (item) => {
				if(item.id === action.payload.id){
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