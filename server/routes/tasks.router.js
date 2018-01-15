const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    queryText = `SELECT * FROM tasks`;
    pool.query(queryText)
    .then((result) => {
        console.log('query results: ', result);            
        res.send(result.rows);
    })
    .catch((err) => {
        console.log('error making select query:', err);
        res.sendStatus(500);
    });
});

// router.post('/', (req, res) => {
//     console.log('req.body:', req.body);
//     queryText = `INSERT INTO tasks (author, description) VALUES ($1, $2)`
    
// });

module.exports = router;