// To run server use nodemon index.js

const express = require('express');
const mongodb = require('mongodb').MongoClient;
const cors = require('cors');
const multer = require('multer');

const STRING = "mongodb://localhost:27017/";
const db = "termProject";
var dbase;
const app = express();
app.use(cors());

app.listen(3000, () => {
    mongodb.connect(STRING, (err, client) => {
        dbase = client.db(db);
        console.log("Database connection has been established!");
    })
})

// Courses CRUD
// GET all courses
app.get("/showCourses", (req, res) => {
    dbase.collection("courses")
        .find({})
        .toArray((err, data) => {
            if (err) res.json({ error: err });
            else res.json(data);
        });
});

// CREATE new course
app.post("/addCourse", multer().none(), (req, res) => {
    dbase.collection("courses").insertOne({
        courseId: req.body.courseId,
        courseName: req.body.courseName,
        description: req.body.description,
        credits: req.body.credits,
        instructor: req.body.instructor
    }, (err, result) => {
        if (err) res.json({ error: err });
        else res.json("Course added successfully!");
    });
});

// UPDATE course
app.put("/updateCourse", multer().none(), (req, res) => {
    dbase.collection("courses").updateOne(
        { courseId: req.body.courseId },
        {
            $set: {
                courseName: req.body.courseName,
                description: req.body.description,
                credits: req.body.credits,
                instructor: req.body.instructor
            }
        },
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json("Course updated successfully!");
        }
    );
});

// DELETE course
app.delete("/deleteCourse", (req, res) => {
    dbase.collection("courses").deleteOne(
        { courseId: req.query.courseId },
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json("Course deleted successfully!");
        }
    );
});

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

// Get (Read)
app.get("/showClassrooms", (req, res) => {
    dbase.collection("classrooms")
        .find({})
        .toArray((err, data) => {
            if (err) throw err;
            res.json(data);
        });
});

app.get("/getClassroom", (req, res) => {
    dbase.collection("classrooms").findOne({
        classroomId: req.query.classroomId,
        campus: req.query.campus
    })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
});


// Post (Create)
app.post("/addClassroom", multer().none(), (req, res) => {

    dbase.collection("classrooms").insertOne({
        classroomId: req.body.classroomId,
        name: req.body.name,
        capacity: req.body.capacity,
        campus: req.body.campus,
        building: req.body.building,
        floor: req.body.floor,
        availability: req.body.availability
    });

    // res.json("One record has been added!");


});


// PUT (Update)
app.put("/updateClassroom", multer().none(), (req, res) => {
  dbase.collection("classrooms").updateOne(
        { classroomId: req.body.classroomId, campus: req.body.campus },
        {
            $set: {
                name: req.body.name,
                capacity: req.body.capacity,
                building: req.body.building,
                floor: req.body.floor,
                availability: req.body.availability
            }
        }
    );


    // res.json("One record has been Updated");
})



// Delete 
app.delete("/deleteClassroom", (req, res) => {
    dbase.collection("classrooms").deleteOne({
        classroomId: req.query.classroomId,
        campus: req.query.campus
    })
    // res.json("Classroom has been deleted!")
})




