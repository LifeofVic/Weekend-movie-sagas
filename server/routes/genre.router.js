const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//! This makes the joins of the table.
//* SELECTS column "name" from the table "genres".
//* JOINS TABLE "movie_genre" at column "genre_id" to TABLE "genre" at column "id".
//* WHERE TABLE "movie_genres".movie_id is EQUAL to the "id" of the selected "id" in [ /details/:id]
router.get('/:id', (req, res) => {
	const movieId = req.params.id;
	const query = `SELECT "genres".name FROM "genres"
  JOIN "movies_genres" ON "genres".id = "movies_genres".genre_id
  WHERE "movies_genres".movie_id = $1;`;
	pool
		.query(query, [movieId])
		.then(result => {
			res.send(result.rows);
		})
		.catch(err => {
			console.log('ERROR: Get all movies', err);
			res.sendStatus(500);
		});
});

module.exports = router;
