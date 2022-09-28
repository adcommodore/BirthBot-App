const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },

    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },

    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },

    state: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 2
    },

    zipcode: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 5
    },

    cSection: Number,

    electiveInduction: Number,

    episiotomy: Number,

}, {timestamps: true, minimize: false});

const Hospital = mongoose.model('Hospital', HospitalSchema);

module.exports = Hospital