"use strict"
import axios from 'axios';


export const getBooks = () => {
	return (dispatch) => {
		axios.get("/api/books")
			.then(
				(response) => {
					dispatch({
						type: "GET_BOOKS",
						payload: response.data
					});
				},
			)
			.catch( (err) => {
				dispatch({
					type: "GET_BOOKS_REJECTED",
					payload: err
				})
			})
	}
	// return {
	// 	type: "GET_BOOKS"
	// }
}


export const addBook = (/*Obj*/book) => {
	return (dispatch) => {
		axios.post("/api/books", book)
			.then(
				(response) => {
					dispatch({
						type: "ADD_BOOK",
						payload: response.data
					});
				},
				(err) => {
					console.log('Axios error on post', err);
				}
			)
			.catch( (err) => {
				dispatch({
					type: "ADD_BOOK_REJECTED",
					payload: "there was an error posting a book"
				});
			})
	}
	// Old method:::
	// return {
	// 	type: "ADD_BOOK",
	// 	payload: book
	// }
}

export const addBooks = (/*Arr[]*/bookArr) => {
	return {
		type: "ADD_BOOKS",
		payload: bookArr
	}
}

export const deleteBook = (/*object*/{_id}) => {
	return (dispatch) => {
		axios.delete('/api/books/' + _id)
			.then(
				(response) => {
					dispatch({
						type: "DELETE_BOOK",
						payload: _id
					})
				}
			)
			.catch( (err) => {
				dispatch({
					type: "DELETE_BOOK_REJECTED",
					payload: "there was an error deleting the book"
				});
			});
	}
	// return {
	// 	type: "DELETE_BOOK",
	// 	payload: id
	// }
}

export const updateBook = (/*Arr[]*/id) => {
	return {
		type: "UPDATE_BOOK",
		payload: id
	}
}


