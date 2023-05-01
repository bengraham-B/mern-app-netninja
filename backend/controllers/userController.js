require('dotenv').config()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'})

}

//todo Login API
//todo Login on frontend
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        //^ Create a Token
        const token = createToken(user._id)
        res.status(201).json({email, token})

    }catch(err) {
        res.status(400).json({err: err.message})
    }
}
 
//* Signup
//todo Signup on frontend
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)
        //^ Create a Token
        const token = createToken(user._id)
        res.status(201).json({email, token})

    }catch(err) {
        res.status(400).json({err: err.message})
    }
}

module.exports = {loginUser, signupUser}