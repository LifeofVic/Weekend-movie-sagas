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
	//Brought in the global state of moviedetails as the object of selected movie was set to the reducer "movieDetail".
	//When I called in the reducer here, the details page can then use that to create the page with the properties in the object.
	const [movie, setMovie] = useState(useSelector(store => store.movieDetails));
	//this contains the genre associated to the movie selected as there is a query call made to the database according to the '/:id' of the path of the details page.
	const movieGenre = useSelector(store => store.genres);
	//this is used to push the path to the homepage whenever the back button is clicked on.
	const history = useHistory();
	//testing to see what the data is for each variable and use them accordingly.
	console.log('movie in DETAILS page: ', movie);
	console.log('genre for movie selected: ', movieGenre);

	//!This section was used to try to map through the genres of the array of objects and have it in a single array of strings, but found an alternative way to use map feature of the movieGenre for each moviegenre.name property.
	// let arrayGenre = [''];

	// for (let i = 0; i < movieGenre.length - 1; i++) {
	// 	{
	// 		arrayGenre[i] = movieGenre[i].name;
	// 	}
	// }

	// console.log('Genre is: ', movieGenre[0].name);
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
				<h4> Genre:</h4>
				{movieGenre.map((genre, index) => {
					return <li key={index}> {genre.name} </li>;
				})}
				<p>{movie.description} </p>

				<Button onClick={HomePage} variant='contained'>
					Back
				</Button>
			</Box>
		</div>
	);
}
