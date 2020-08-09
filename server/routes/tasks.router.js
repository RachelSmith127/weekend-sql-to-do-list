//includes
const express = require('express');
// const bodyParser = require('body-parser');
const tasksRouter = express.Router();
const pg = require('pg');
//SET PG to connect to DB
const Pool = pg.Pool;
const pool = new Pool({
    database: 'tasks',
    port: 5432,
    host: 'localhost'
});

//let's us know if we have connected 
pool.on('connect', () =>{
    console.log('pg connected!');
});

pool.on('error', (error) =>{
    console.log('error with pool', error)
});

// router.get('/', (req, res) => {
//     let queryText = `SELECT * FROM "tasks";`
//     //go to db
//     //get the tasks
//     pool.query(queryText).then(( result) => {
//         console.log(result.rows);//result is too big, we care about rows
//         res.send(result.rows);
//     }).catch((error) => {// catch if not working
//         console.log('error in GET', error);
//         //all good servers respond
//         res.sendStatus(500);
//     })
//     //send songs back to client! 
//     // res.send(tasks)
// });

// router.post('/', (req, res) => {
//     let queryText = `
//     INSERT INTO "tasks" (INSERT INTO "tasks" ("actionItem", "levelOfImportance", "deadline", "complete", "additionalNotes")
//     VALUES ($1, $2, $3, $4);
//     `; //sanitization
//     console.log(req.body);
// })

module.exports = tasksRouter;