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
app.get("/showRecords", (req, res) => {
  dbase.collection("students")
    .find({})
    .toArray((err, data) => {
      if (err) res.json({ error: err });
      else res.json(data);
    });
});


app.post("/addRecord", (req, res) => {
  dbase.collection("students").insertOne(
    {
      id: req.body.id,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      course: req.body.course,
      gpa: req.body.gpa
    },
    (err, result) => {
      if (err) {
        res.json({ error: err })}
      else 
        {res.json("Student added successfully!")};
    }
  );
});


app.post("/deleteRecord", (req, res) => {
  dbase.collection("students").deleteOne(
    { id: req.body.id },
    (err, result) => {
      if (err) 
        {res.json({ error: err })}
      else
        { res.json("Student deleted successfully!")};
    }
  );
});


app.post("/updateRecord", (req, res) => {
  dbase.collection("students").updateOne(
    { id: req.body.id },
    {
      $set: {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        course: req.body.course,
        gpa: req.body.gpa
      }
    },
    (err, result) => {
      if (err)
        { res.json({ error: err })}
      else
        { res.json("Student updated successfully!")};
    }
  );
});

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




