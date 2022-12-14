import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
	yield takeEvery('FETCH_MOVIES', fetchAllMovies);
	yield takeEvery('SET_GENRE', fetchGenre);
}

function* fetchAllMovies() {
	// get all movies from the DB
	try {
		const movies = yield axios.get('/api/movie');
		console.log('get all:', movies.data);
		yield put({ type: 'SET_MOVIES', payload: movies.data });
	} catch {
		console.log('get all error');
	}
}
//! this will store the selectedMovie object onClick.
const movieDetails = (state = [], action) => {
	if (action.type === 'SET_DETAILS') {
		return action.payload;
	}
	console.log('MovieDetail payload is: ', action.payload);
	return state;
};
//! -----------------------------------------
//!This will utilize the router.get in the genre.router to receive the genre of the desired movie according to the :id of the url.
function* fetchGenre(action) {
	try {
		const movieId = action.payload.id;
		const genre = yield axios.get(`/api/genre/${movieId}`);
		yield put({
			type: 'SET_GENRES',
			payload: genre.data,
		});
	} catch (err) {
		console.error(err);
	}
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
	switch (action.type) {
		case 'SET_MOVIES':
			return action.payload;
		default:
			return state;
	}
};

// Used to store the movie genres
const genres = (state = [], action) => {
	switch (action.type) {
		case 'SET_GENRES':
			return action.payload;
		default:
			return state;
	}
};
//! made sure to add the newly reducer here to be able to utilize this reducer where ever it is called.
// Create one store that all components can use
const storeInstance = createStore(
	combineReducers({
		movies,
		genres,
		movieDetails,
	}),
	// Add sagaMiddleware to our store
	applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={storeInstance}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
