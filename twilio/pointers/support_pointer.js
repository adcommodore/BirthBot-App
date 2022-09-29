const mongoose = require('mongoose');

const SupportPointerSchema = new mongoose.Schema({

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

        email: {
            type: String
        },

        text: {
            type: String
        },

}, { timestamp: true })

const SupportPointer = mongoose.model('SupportPointer', SupportPointerSchema);

module.exports = SupportPointer