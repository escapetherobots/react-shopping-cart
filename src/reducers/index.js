"use strict"

import {combineReducers} from 'redux';

import {booksReducer} from './booksReducer';
import {cartReducer} from './cartReducer';
import {modalReducer} from './modalReducer';

export default combineReducers({
	books: booksReducer,
	cart: cartReducer,
	modal: modalReducer

})