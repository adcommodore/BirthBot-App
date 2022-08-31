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
        maxlength: 200
    },

    cSection: Number,

    electiveInduction: Number,

    episiotomy: Number,

}, {timestamps: true, minimize: false});

const Hospital = mongoose.model('Hospital', HospitalSchema);

module.exports = Hospital