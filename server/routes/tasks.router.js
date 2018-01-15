const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM tasks ORDER BY id`;
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

router.post('/', (req, res) => {
    const queryText = 'INSERT INTO tasks (author, description) VALUES ($1, $2)';
    pool.query(queryText, [req.body.author, req.body.description])
    .then((result) => {
        console.log('query results: ', result);            
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log('error making select query:', err);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    const queryText = 'DELETE FROM tasks WHERE "id"= $1'
    pool.query(queryText, [req.params.id])
        .then((result) => {
         console.log('query results: ', result);
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log('error making insert query:', err);
        res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
    let queryText = 'UPDATE tasks SET completion = $1 WHERE id = $2'
    pool.query(queryText, [req.body.completion, req.params.id])
    .then((result) => {
        console.log('query results: ', result);
       res.sendStatus(201);
   })
   .catch((err) => {
       console.log('error making insert query:', err);
       res.sendStatus(500);
   });
});

module.exports = router;