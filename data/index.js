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
// Get (Read) all courses
app.get("/showCourses", (req, res) => {
    dbase.collection("courses")
        .find({})
        .toArray((err, data) => {
            if (err) throw err;
            res.json(data);
        });
});

// Get (Read) a single course by courseId
app.get("/getCourse", (req, res) => {
    dbase.collection("courses").findOne({
        courseId: req.query.courseId
    })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
});

// Post (Create)
app.post("/addCourse", multer().none(), (req, res) => {
    dbase.collection("courses").insertOne({
        courseId: req.body.courseId,
        name: req.body.name,
        description: req.body.description,
        instructor: req.body.instructor,
        credits: req.body.credits
    });

    // Uncomment if you want a success message
    // res.json("One course has been added!");
});

// PUT (Update)
app.put("/updateCourse", multer().none(), (req, res) => {
    dbase.collection("courses").updateOne(
        { courseId: req.body.courseId },
        {
            $set: {
                name: req.body.name,
                description: req.body.description,
                instructor: req.body.instructor,
                credits: req.body.credits
            }
        }
    );

    // Uncomment if you want a success message
    // res.json("Course has been updated!");
});

// Delete
app.delete("/deleteCourse", (req, res) => {
    dbase.collection("courses").deleteOne({
        courseId: req.query.courseId
    });

    // Uncomment if you want a success message
    // res.json("Course has been deleted!");
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
// Instructors CRUD done By Himmat

// GET all instructors
app.get("/showInstructors", (req, res) => {
  dbase.collection("instructors")
    .find({})
    .toArray((err, data) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json(data);
      }
    });
});

// GET one instructor by instructorId
app.get("/getInstructor", (req, res) => {
  dbase.collection("instructors")
    .findOne({ instructorId: req.query.instructorId })
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err }));
});

// ADD instructor
app.post("/addInstructor", multer().none(), (req, res) => {
  dbase.collection("instructors").insertOne(
    {
      instructorId: req.body.instructorId,
      name: req.body.name,
      department: req.body.department,
      email: req.body.email,
      phone: req.body.phone,
      active: req.body.active, 
    },
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json("Instructor added successfully!");
      }
    }
  );
});

// UPDATE instructor
app.put("/updateInstructor", multer().none(), (req, res) => {
  dbase.collection("instructors").updateOne(
    { instructorId: req.body.instructorId },
    {
      $set: {
        name: req.body.name,
        department: req.body.department,
        email: req.body.email,
        phone: req.body.phone,
        active: req.body.active,
      },
    },
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json("Instructor updated successfully!");
      }
    }
  );
});

// DELETE instructor
app.delete("/deleteInstructor", (req, res) => {
  dbase.collection("instructors").deleteOne(
    { instructorId: req.query.instructorId },
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json("Instructor deleted successfully!");
      }
    }
  );
});

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




