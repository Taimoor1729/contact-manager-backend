const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("User already exists")
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password: hashPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
        })
    } else {
        res.status(400)
        throw new Error("User data is not valid")
    }
})


const loginUser = asyncHandler(async (req, res) => {
    console.log("login user")
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const user = await User.findOne({ email })
    console.log("userinfo: ", user)
    if (!user) {
        res.status(400)
        throw new Error("User not found")
    }
    console.log("before hash compare", user.password)
    console.log("before hash compare", password)
    const hashCompare = await bcrypt.compare(password, user.password)
    console.log(hashCompare)

    if (user && hashCompare) {

        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN || 'temitech669', { expiresIn: '15m' })
        res.status(200).json({ accessToken })
    }
    else {
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}