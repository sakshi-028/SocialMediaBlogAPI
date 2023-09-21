const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: "String",
        required: true
    },
    email: {
        type: "string",
        required: true,
        unique: true,
    },
    password: {
        type: "string",
        required: true,
        minlength:6,
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"Blog",
        required:true
    }]
})

module.exports = new mongoose.model("User", userSchema);