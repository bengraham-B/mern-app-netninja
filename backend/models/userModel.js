const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//* Static Method to signup in a user
userSchema.statics.signup = async function (email, password){

    //? Validation
    if(!email || !password){ //? If password and email fields are empty 
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){//? Checks if the user email is valid and runs this code bloc if it is not valid
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)) { //?Checks if the user password is strong enoug and runs this code bloc if it is not strogn enogh
        throw Error("Password is not strong enough")
    }


    const exists = await this.findOne({ email }) //^ '.this' refers to the model, User
    if(exists){ //! Throws error if the use's inputed email is in the DB, so they will be unable to signup with that email.
        throw Error("Email already in use")
    }

    //^ generate SALT
    const salt = await bcrypt.genSalt(10) //^ '10' cost of salt
    const hash = await bcrypt.hash(password, salt) //^ 1st argue: password the user wants to hash. 2nd: the salt.

    //^ Store the user's name and password in the DB.
    const user = await this.create({ email, password: hash})

    return user //^ returning the user as this function willcalled in the controller file.
}



//* Static Method to signup in a user
userSchema.statics.login = async function (email, password){
    
    if(!email || !password){ //? If password and email fields are empty 
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email }) //^ '.this' refers to the model, User
    if(!user){ //! Throws error if the use's inputed email is in the DB, so they will be unable to signup with that email.
        throw Error("Emial is not registered")
    }

    //^ Match passwords, user inputed password and hashed password store in the db under the username
    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error("Inncorect password")
    }

    return user
}

module.exports = mongoose.model('User', userSchema)