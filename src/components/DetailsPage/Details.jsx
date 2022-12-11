import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../DetailsPage/DetailsStyle.css';
import { Box } from '@mui/material';

export default function Details() {
	const [movie, setMovie] = useState(useSelector(store => store.movieDetails));
	const movieGenre = useSelector(store => store.genres);
	const history = useHistory();

	console.log('movie in DETAILS page: ', movie);
	console.log('genre for movie selected: ', movieGenre);
	const HomePage = () => {
		history.push('/');
	};

	return (
		<div className='container'>
			<Box
				variant='outlined'
				sx={{ maxWidth: 1000 }}
				style={{ backgroundColor: 'lightgray' }}>
				<h2> {movie.title}</h2>
				<img src={movie.poster} />
				{movieGenre.map(genre => {
					return <p>{genre}</p>;
				})}

				<p>{movie.description} </p>
				<Button onClick={HomePage} variant='contained'>
					Back
				</Button>
			</Box>
		</div>
	);
}
