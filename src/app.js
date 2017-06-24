"use strict"

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';

//IMPORT COMBINED REDUCERS
import reducers from './reducers/';

import {myBooksList} from './localData/';
// ACTIONS
import * as cartActions from './actions/cartActions';
import * as bookActions from './actions/bookActions';


// SUBSCRIBE TO CHANGES IN STATE
//store.subscribe( () => console.log('current state is: ', store.getState()) );
const middleware = applyMiddleware(logger);

// CREATE STORE
const store = createStore(reducers, middleware);

// DISPATCH AN ACTION
store.dispatch(bookActions.addBook(
	{
		id: 1,
		title: 'Harry Potter',
		description: 'Adventures at Hogwarts',
		price: 33.33
	}
));

// DISPATCH AN ACTION
store.dispatch(bookActions.addBook(
	{
		id: 2,
		title: 'Star Wars',
		description: 'battle of endor',
		price: 33.33
	}
));

// DISPATCH AN ACTION
store.dispatch(bookActions.addBook(
	{
		id: 10,
		title: 'War of the Worlds',
		description: 'martian take over',
		price: 33.33
	}
));



store.dispatch(bookActions.addBooks(myBooksList));

store.dispatch(bookActions.deleteBook({id: 10}));

store.dispatch(bookActions.updateBook({id: 2, description: 'zzz book id 2'}));

store.dispatch(cartActions.addToCart( [{id:2}] ) );