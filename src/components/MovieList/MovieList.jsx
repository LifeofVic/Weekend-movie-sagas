import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Details from '../DetailsPage/Details';
function MovieList() {
	const dispatch = useDispatch();
	const history = useHistory();

	const movies = useSelector(store => store.movies);

	useEffect(() => {
		dispatch({ type: 'FETCH_MOVIES' });
	}, []);

	const handleDescription = movie => {
		console.log('Movie clicked: ', movie);
		dispatch({});

		history.push('/details/' + movie.id);
		// axios.get('/' + movie.id).then(response => {
		// 	console.log('Getting information from selected movie');
		// });
	};

	return (
		<main>
			<h1>MovieList</h1>
			<section className='movies'>
				{movies.map(movie => {
					return (
						<div key={movie.id}>
							<h3>{movie.title}</h3>
							<img
								src={movie.poster}
								alt={movie.title}
								onClick={() => handleDescription(movie)}
							/>
						</div>
					);
				})}
			</section>
		</main>
	);
}

export default MovieList;
