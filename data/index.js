// To run server use nodemon index.js

const express=require('express');
const mongodb=require('mongodb').MongoClient;
const cors=require('cors');
const multer=require('multer');

const STRING = "mongodb://localhost:27017/";
const db = "termProject";
var dbase;
const app=express();
app.use(cors());

app.listen(3000, ()=>
{
    mongodb.connect(STRING, (err, client)=>
    {
        dbase = client.db(db);
        console.log("Database connection has been established!");
    })
})

// Courses CRUD

// Students CRUD

// Instructors CRUD

// Classrooms CRUD done by Sofiia Tsepotan 

// Read
app.get("/showClassrooms", (req, res) => {
    dbase.collection("classrooms")
        .find({})
        .toArray((err, data) => {
            if (err) throw err;
            res.json(data);
        });
});

// Post




