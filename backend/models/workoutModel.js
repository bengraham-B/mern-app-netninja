const mongoose = require('mongoose')

const dateString = require('../date')

const Schema = mongoose.Schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    created_at:{
        type: String,
        default: dateString()
    }
}, {timestamps: true}) //^ When the document was created at last updated

//^ Making a model

module.exports = mongoose.model('Workout', workoutSchema)

