import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Details() {
	const [movie, setMovie] = useState(useSelector(store => store.movieDetails));
	const history = useHistory();

	console.log('movie in DETAILS: ', movie);

	const HomePage = () => {
		history.push('/');
	};

	return (
		<div className='container'>
			<h2> {movie.title}</h2>
			<img src={movie.poster} />
			<p>{movie.description} </p>
			<button onClick={HomePage}> Back </button>
		</div>
	);
}
