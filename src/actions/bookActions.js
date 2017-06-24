"use strict"

export const getBooks = () => {
	return {
		type: "GET_BOOKS"
	}
}


export const addBook = (book) => {
	return {
		type: "ADD_BOOK",
		payload: book
	}
}

export const addBooks = (bookArr) => {
	return {
		type: "ADD_BOOKS",
		payload: bookArr
	}
}

export const deleteBook = (id) => {
	return {
		type: "DELETE_BOOK",
		payload: id
	}
}

export const updateBook = (id) => {
	return {
		type: "UPDATE_BOOK",
		payload: id
	}
}

