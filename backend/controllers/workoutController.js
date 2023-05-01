//^ Importing the workout model
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')


//* GET all workouts API
//todo GET all workout MongoDB
const getWorkouts = async (req, res) => {
    const workout = await Workout.find({}).sort({createdAt: -1}) //^ Sorting them, newest ones at the top.

    res.status(200).json(workout)
}

//* GET single workout API
//* GET a workout MongoDB
const getWorkout = async (req, res) => {
    const {id} = req.params //^ getting the id from the changeable part of the url '/:id'
    const workout = await Workout.findById(id)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    if(!workout){ //^ If workout does not exist in the database
        return res.status(404).json({error: "No such workout!"})
    }

    res.status(200).json({workout})
}

//* POST a workout API
//* POST a workout MongoDB
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    //~ Decteing which fields are empty when a user adds a new workout
    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }

    //~ If length of the array is greater then 0, it means that there is an error.
    if(emptyFields.length > 0){
        return res.status(400).json( {error:'Please in all the fields', emptyFields })

    }


    //^ Adding doc to db
    try{
        const workout = await Workout.create({title ,load ,reps}) //^ Storing response in 'workout' -> ths is the new document which was just created as well as the _id of the doc
        res.status(200).json(workout)
    } catch(error){
        res.status(400).json({error: error.message})
    }


}

//* DELETE a workout API
//* DELETE a workout MongoDB
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){ //^ If workout does not exist in the database
        return res.status(404).json({error: "No such workout!"})
    }

    res.status(200).json(workout)
}


//* PATCH a workout API
//todo PATCH a workout MongoDB
const updateWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body //^ Sends what ever objects are in the body as the new updated values to mongoDB
    })

    if(!workout){ //^ If workout does not exist in the database
        return res.status(404).json({error: "No such workout!"})
    }

    res.status(200).json(workout) //^ Sending back the workout which was just updated.

}

module.exports = {createWorkout, getWorkout, getWorkouts, deleteWorkout, updateWorkout}