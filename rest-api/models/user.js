const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profilepicture: {
        type: String,
        default: " "
    },
    coverpicture: {
        type: String,
        default: " "
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isadmin: {
        type: Boolean,
        default: false,
    },
    desc:
    {
        type: String,
        max:50,
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type: Number,
        enum:[1,2,3]
    }

}, { timestamps: true }); // <-- Move { timestamps: true } here

module.exports = mongoose.model("user", userschema);
