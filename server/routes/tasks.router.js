//includes
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

//SET PG to connect to DB
const Pool = pg.pool;
const pool = new Pool ({ //pool constructor
    database: 'tasks', //connecting to our database
    port: 5432,
    host: 'localhost'
});

//let's us know if we have connected 
pool.on('connect', () =>{
    console.log('pg connected!');
});

pool.on('error', (error) =>{
    console.log('error with pool', error)
})

app.use(bodyParser.urlencoded({extended: true}));
//uses 
app.use(express.static('server/public'));

//spin up server 
app.listen(port, ()=>{
    console.log('server up on:', port);
})

// routes
module.exports = tasksRouter;