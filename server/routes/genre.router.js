const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
	//* Add query to get all genres --done
	const query = `SELECT * FROM "genres";`;
	res.sendStatus(500);
});

module.exports = router;
