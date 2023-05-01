require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workout') //^ Importing the workout routes
const userRoutes = require('./routes/user') //^ Importing the User routes (Auth)
const mongoose = require('mongoose')

const dateString = require('./date')

const app = express()

//^ ======= MIDDILE WARE ======
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method, dateString())
    next()
})

//~ Routes
app.use('/api/workouts', workoutRoutes) //& Using the workout routes on the APP. The first argument is the path and the second is the routes which will be used at the path.
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DATABASE_NAME //* Connecting to the CAR_INV_DB database
}).then(() => {

    //^ Listen for requests after a connection to the DB has been made.
    app.listen(process.env.PORT, ()=> {
        console.log(`Connected to DATABASE:${process.env.DATABASE_NAME}`, dateString())
        console.log("Listening on PORT:4000", dateString())
    })
})
