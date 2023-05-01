const express = require('express')
const {loginUser, signupUser} = require('../controllers/userController')

const router = express.Router()

//todo Login Route
router.post('/login', loginUser)

//todo Signup Route
router.post('/signup', signupUser)




module.exports = router