const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models/Workout");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


// HTML routes

const path = require("path");


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});



// API routes


app.get("/api/workouts", (req, res) => {
    db.find({})
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.json(err);
        });
});


// app.get("/exercise", (req, res) => {
//     db.find({})
//         .then(dbWorkouts => {
//             res.json(dbWorkouts);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });



app.post("/api/workouts", ({ body }, res) => {
    db.create(body)
        .then(({ _id }) => db.findOneAndUpdate({}, { $push: { workouts: _id } }, { new: true }))
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.json(err);
        });
});

// app.get("/populateduser", (req, res) => {
//     db.User.find({})
//         .populate("notes")
//         .then(dbUser => {
//             res.json(dbUser);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
