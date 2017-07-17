"use strict"

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

//REDUX, MIDDLEWARE AND REDUCERS
import { applyMiddleware, createStore } from 'redux';
//import logger from 'redux-logger';


import thunk from 'redux-thunk';
import reducers from './reducers/';

// ACTIONS
import * as cartActions from './actions/cartActions';
import * as bookActions from './actions/bookActions';

// COMPONENTS
import routes from './routes';
// SUBSCRIBE TO CHANGES IN STATE
//store.subscribe( () => console.log('current state is: ', store.getState()) );

//const middleware = applyMiddleware(thunk);
const middleware = applyMiddleware(thunk);

//
// PASS INITIAL STATE FROM SERVER STORE!!!
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);

const Routes = (
	<Provider store={store}>
		{routes}
	</Provider>
);

//RENDER APP
render(Routes, document.getElementById('app'));

