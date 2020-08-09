//includes
const express = require('express');
// const bodyParser = require('body-parser');
const taskRouter = express.Router();
const pg = require('pg');
//SET PG to connect to DB
const Pool = pg.Pool;
const pool = new Pool({
    database: 'tasks',
    port: 5432,
    host: 'localhost'
});

//let's us know if we have connected 
// pool.on('connect', () =>{
//     console.log('pg connected!');
// });

// pool.on('error', (error) =>{
//     console.log('error with pool', error)
// });

//GET 
taskRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "id";';
    pool.query(queryText).then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting tasks', error);
      res.sendStatus(500);
    });
})

// POST
taskRouter.post('/', (req, res) => {
    let newTask  = req.body;
    console.log('Adding new task:', newTask);
    let queryTex = `
    INSERT INTO "tasks" (INSERT INTO "tasks" ("actionItem", "levelOfImportance", "deadline", "complete", "additionalNotes")
    VALUES ($1, $2, $3, $4);
    `; //sanitization
    pool.query(queryText, [newTask.actionItem, newTask.levelOfImportance, newTask.deadline, newTask.complete, newTask.additionalNotes])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new task`, error); 
      res.sendStatus(500);
    });
    
});

//PUT
taskRouter.put("/T/:id", (req, res) => {
    console.log("In Put", req.params.id, req.body);
    let queryText = `
        UPDATE "tasks"
        SET "complete" = 'YES'
        WHERE "id" = $1;
        `;
    pool
      .query(queryText, [req.params.id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log("error in complete", error);
        res.sendStatus(500);
      });
  });

 //DELETE 
  taskRouter.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);
    let sqlText = 'DELETE FROM "tasks" WHERE "id"=$1;';
    pool.query(sqlText, [req.params.id])
      .then( (result) => {
        console.log('task deleted');
        res.sendStatus(200);
      })
      .catch( (error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500); // Good server always responds
      })
  })

module.exports = taskRouter;