const asyncHandler = require('express-async-handler') 
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("Please add all fields")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User already exists")
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password: hashPassword
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            email: user.email,


        })
    }else {
        res.status(400)
        throw new Error("User data is not valid")
    }
} )


const loginUser = asyncHandler(async(req, res) => {
    res.json({message: "login the user"})
} )

const currentUser = asyncHandler(async(req, res) => {
    res.json({message: "current user information"})
} )

module.exports = {
    registerUser,
    loginUser,
    currentUser
}