import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
function MovieList() {
	const dispatch = useDispatch();
	const history = useHistory();

	const movies = useSelector(store => store.movies);

	useEffect(() => {
		dispatch({ type: 'FETCH_MOVIES' });
	}, []);

	const handleDescription = movie => {
		console.log('Movie clicked: ', movie);
		dispatch({
			type: 'SET_DETAILS',
			payload: movie,
		});
		dispatch({
			type: 'SET_GENRE',
			payload: movie,
		});
		history.push('/details/' + movie.id);
	};

	const detail = useSelector(store => store.movieDetails);

	console.log('This is the current movie detail: ', detail);
	return (
		<main>
			<h1>MovieList</h1>
			<section className='movies'>
				{movies.map(movie => {
					return (
						<Card
							key={movie.id}
							className='card'
							sx={{
								maxWidth: 250,
								backgroundColor: 'gray',
								'&:hover': {
									backgroundColor: 'white',
								},
							}}>
							<CardContent>
								<Typography variant='h5' noWrap={false}>
									{movie.title}
								</Typography>
								<img
									src={movie.poster}
									alt={movie.title}
									onClick={() => handleDescription(movie)}
								/>
							</CardContent>
						</Card>
					);
				})}
			</section>
		</main>
	);
}

export default MovieList;
