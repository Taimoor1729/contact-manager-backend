const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    name: {
        type: String,
        requires: [true, "please add a contact name"],
    },
    email: {
        type: String,
        requires: [true, "please add a contact email"]
    },
    phone: {
        type: String,
        requires: [true, "please add a contact phone"]
    }
},
    {
        timestamps: true,
    }

);

module.exports = mongoose.model("Contact", contactSchema);