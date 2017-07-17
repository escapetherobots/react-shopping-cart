"use strict"
import axios from 'axios';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server'; // render components to a string
import { match, RouterContext } from 'react-router'; 

import reducers from './src/reducers/index';
import routes from './src/routes';

function handleRender(req, res){
	axios.get('http://localhost:3001/books')
		.then(
			function(response){
				// EXAMPLE SERVER-SIDE RENDERING:
				// var myHtml = JSON.stringify(response.data);
				// res.render('index', {myHtml});

				//=======================================================
				// STEP-1 CREATE A REDUX STORE ON THE SERVER
				const store = createStore(reducers, {"books": {"books": response.data} })

				//=======================================================
				// STEP-2 GET INITIAL STATE FROM THE STORE
				const initialState = JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
				// ADD FRONT-END FORM VALIDATIONS!!!!!!! TO PREVENT JS INJECTION ATTACKS

				//=======================================================
				// STEP-3 IMPLEMENT REACT-ROUTER ON THE SERVER TO INTERCEPT CLIENT REQUESTS
				// AND DEFINE WHAT TO DO WITH THEM
				const Routes = {
					routes: routes,
					location: req.url
				};

				match(Routes, function(error, redirect, props){
					if(error){
						res.status(500).send("Error fullfilling the request");
					} else if(redirect){
						res.status(302, redirect.pathname + redirect.search)
					} else if(props){
						// render the provider and router context as a string and inject into the index.ejs
						const reactComponent = renderToString(
							<Provider store={store}>
								<RouterContext {...props} />
							</Provider>
						);
						res.status(200).render('index', {reactComponent, initialState})
					} else {
						res.status(404).send('Page Not Found');
					}	
				});

			}
		).catch(
			function(err){
				console.log('#Initial Server-side rendering error', err);
			}
		) 
}

module.exports = handleRender;