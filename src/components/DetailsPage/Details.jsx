import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Details() {
	const movie = useSelector(store => store.movieDetails);
	const [detail, setDetail] = useState();

	console.log('movie in DETAILS: ', movie);

	useEffect(() => {
		fetchDescription();
	}, []);

	const fetchDescription = () => {
		axios.get('/:id').then(response => {
			setDetail(response);
			console.log('detail: ', detail);
		});
	};

	return (
		<div>
			<h1> This is the details page</h1>
			<h2> {JSON.stringify(detail)}</h2>
		</div>
	);
}
