const mongoose = require('mongoose');
const {isEmail} = require('validator');

const AdminSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [ true, "You must enter your first name."],
        minlength: [ 2, "Please enter at least 2 characters."],
        maxlength: [ 20, "Please shorten your first name to under 20 characters."]
    },

    lastName: {
        type: String,
        required: [ true, "You must enter your last name."],
        minlength: [ 1, "Please enter at least 1 characters."],
        maxlength: [ 50, "Please shorten your last name to under 50 characters."]
    },

    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [ true, "Your must enter your email address."],
        minlength: [ 5, "Please enter at least 1 characters."],
        maxlength: [ 100, "Please shorten your last name to under 50 characters."],
        index: true,
        validate: [isEmail, "invalid email"]
    },

    phoneNumber: {
        type: Number,
        required: [ true, "You must enter your phone number."],
        unique: true, 
        minlength: [ 10, "Please enter a 10 digit phone with no spaces or other characters."],
        maxlength: [ 10, "Please enter a 10 digit phone with no spaces or other characters."],
        trim: true,
    },

    password: {
        type: String,
        default: process.env.ADMIN_PASSWORD,
        required: [ true, "You must enter a password." ],
        minlength: [ 8, "Please create a password with at least 12 characters" ],
        maxlength: 1000
    },
    refreshToken: [String]

}, {timestamps: true, minimize: false});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin