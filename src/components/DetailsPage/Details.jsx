import axios from 'axios';

export default function Details() {
	axios.get('/${movie.id}').then(response => {});

	return (
		<div>
			<h1> This is the details page</h1>
			{JSON.stringify(movie)}
		</div>
	);
}
