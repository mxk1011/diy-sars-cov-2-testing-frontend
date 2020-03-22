"use strict";
const  express  =  require('express');
const  bodyParser  =  require('body-parser');
const cors = require('cors')
const  sqlite3  =  require('sqlite3').verbose();
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs');

const SECRET_KEY = "secretkey23456";

const  app  =  express();
const  router  =  express.Router();
app.use(cors())

router.use(bodyParser.urlencoded({ extended:  false }));
router.use(bodyParser.json());
const database = new sqlite3.Database("./my.db");

const  createTestsTable  = () => {
    const  sqlQuery  =  `
        
        CREATE TABLE IF NOT EXISTS tests (
        id integer PRIMARY KEY,
        userId integer,
        result bit 
        )`;

    return  database.run(sqlQuery);
}

const  findTestsByUserId  = (userId, cb) => {
    return  database.get(`SELECT * FROM tests WHERE userId = ?`,userId, (err, row) => {
        cb(err, row)
    });
}


const updateTest = (data, cb) => {
    return database.run('UPDATE tests set result = ? WHERE id=? and userId=?',[data.result, data.id, data.userId], (err) => {
        cb(err)
    });
}

const  createTest  = (userId, cb) => {
    return  database.run('INSERT INTO tests (userId) VALUES (?)',userId, (err) => {
        cb(err)
    });
}

createTestsTable();

router.get('/', (req, res) => {
    res.status(200).send('This is an test data server');
});

router.post('/submit', (req, res) => {

    const  userId  =  req.body.userId;


    createTest(userId, (err)=>{
        if(err) return  res.status(500).send("Server error!");
        findTestsByUserId(userId, (err, test)=>{
            if (err) return  res.status(500).send('Server error!');

            res.status(200).send({ "test":  test});
        });
    });
});


router.post('/fetch', (req, res) => {
    const  userId  =  req.body.userId;
    findTestsByUserId(userId, (err, test)=>{
        if (err) return  res.status(500).send('Server error!');

        res.status(200).send({ "test":  test});
    });
});

router.post('/result', (req, res) => {
    const userId  =  req.body.userId;
    const result = req.body.result;
    const id = req.body.Id;
    updateTest([id, userId, result], (err)=>{
        if (err) return  res.status(500).send('Server error!');
        res.status(200).send({ "ok":  "ok"});
    });
});

app.use(router);
const  port  =  process.env.PORT  ||  3020;
const  server  =  app.listen(port, () => {
    console.log('Server listening at http://localhost:'  +  port);
});