const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
    },
    email:{
        type: String,
        required:[true, "Please add the user Email Address"],
        unique:[true, "email already exists"],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],  
    }

    },{

        timestamps: true,
    })

    module.exports = mongoose.model('User', userSchema)