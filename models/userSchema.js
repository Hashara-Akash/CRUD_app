const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    program_details: {
        type: String,
        required: true
    }
});

const users = new mongoose.model("users", userSchema);

module.exports = users; 