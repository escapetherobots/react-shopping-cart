"use strict"

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';

//IMPORT COMBINED REDUCERS
import reducers from './reducers/';

// ACTIONS
import * as cartActions from './actions/cartActions';
import * as bookActions from './actions/bookActions';

import BooksList from './components/pages/booksList';

// SUBSCRIBE TO CHANGES IN STATE
//store.subscribe( () => console.log('current state is: ', store.getState()) );
const middleware = applyMiddleware(logger);

// CREATE STORE
const store = createStore(reducers, middleware);



render(
	<Provider store={store}>
		<BooksList />
	</Provider>,
	document.getElementById('app')
);

