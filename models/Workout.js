const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({

    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: String,
            required: "Enter an exercise"
        }

    ]
});

const Transaction = mongoose.model("workouts", transactionSchema);

module.exports = Transaction;
