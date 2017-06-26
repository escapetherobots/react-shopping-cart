"use strict"

export const getBooks = () => {
	return {
		type: "GET_BOOKS"
	}
}


export const addBook = (/*Obj*/book) => {
	return {
		type: "ADD_BOOK",
		payload: book
	}
}

export const addBooks = (/*Arr[]*/bookArr) => {
	return {
		type: "ADD_BOOKS",
		payload: bookArr
	}
}

export const deleteBook = (/*Arr[]*/id) => {
	return {
		type: "DELETE_BOOK",
		payload: id
	}
}

export const updateBook = (/*Arr[]*/id) => {
	return {
		type: "UPDATE_BOOK",
		payload: id
	}
}


