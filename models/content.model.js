const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({

    deliveryIndex: {
        type: Number,
        required: true,
        min: 0,
        max: 6,
    },

    gestationalWeek: {
        type: Number,
        required: true,
        min: 4,
        max: 54,
    },

    hasGivenBirth: {
        type: Boolean,
        required: true,
        default: false,
    },

    body: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1600,
    },

    mediaUrl: {
        type: String,
    }
    
}, {timestamps: true, minimize: false});

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content
