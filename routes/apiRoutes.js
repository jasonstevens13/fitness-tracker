
const mongoose = require("mongoose");
const Workout = require("../models/Workout.js");


// API routes

module.exports = function (app) {

    // add new workout
    app.post("/api/workouts", ({ body }, res) => {
        Workout.create(body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });



    // get the last workout
    app.get("/api/workouts", (req, res) => {
        Workout.find()
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // get the full range of workouts
    app.get("/api/workouts/range", (req, res) => {
        Workout.find()
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // update workout
    app.put("/api/workouts/:id", (req, res) => {
        Workout.findByIdAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });


}
