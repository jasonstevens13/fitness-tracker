
const mongoose = require("mongoose");
const db = require("../models");


// API routes

module.exports = function (app) {

    // add new workout
    app.post("/api/workouts", ({ body }, res) => {
        db.Workout.create(body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });



    // get the last workout
    app.get("/api/workouts", (req, res) => {
        db.Workout.find()
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // get the full range of workouts
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find()
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // update workout
    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findByIdAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });


}
