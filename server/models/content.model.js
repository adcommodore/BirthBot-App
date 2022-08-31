const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({

    index: {
        type: Number,
        required: true,
        min: 0,
        max: 6,
    },

    gestationalDay: {
        type: Number,
        required: true,
        min: 1,
        max: 300,
    },

    body: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1600,
    },

    mediaAdded: {
        type: Boolean,
        default: false
    },

    mediaURL: {
        type: String,
    }
    
}, {timestamps: true, minimize: false});

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content

