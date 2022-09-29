const mongoose = require('mongoose');

const HospitalPointerSchema = new mongoose.Schema({

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

        phoneNumber: {
            type: String,
            required: true
        },

        current: {
            type: String,
            
        },

        next: {
            type: String,
            required: true,
        },

        selectedState: {
            type: String
        },

        selectedCity: {
            type: String
        },

        nameSearch: {
            type: String
        },

        hospitals: [String],

}, { timestamp: true })

const HospitalPointer = mongoose.model('HospitalPointer', HospitalPointerSchema);

module.exports = HospitalPointer