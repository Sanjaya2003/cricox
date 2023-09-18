const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const postschema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        max: 500
    },
    img: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
},
    { timestamps: true }); // <-- Move { timestamps: true } here

module.exports = mongoose.model("post", postschema);
