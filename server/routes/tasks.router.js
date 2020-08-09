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

module.exports = tasksRouter;