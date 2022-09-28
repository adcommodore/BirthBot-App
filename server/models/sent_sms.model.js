const mongoose = require('mongoose');

const SentSMSSchema = new mongoose.Schema({

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        contentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Content'
        },

        contentDeliveryIndex: {
            type: Number,
            min: 0,
            max: 6,
        },

        contentGestationWeek: {
            type: Number,
            min: 4,
            max: 42,
        },

        sentTo: {
            type: String,
            required: [ true, "Reciever's phone number required."]
        },

        body: {
            type: String,
            required: [ true, "Message body required."],
            maxlength: [ 1600, "Please shorten the length of your message"]
        },

        mediaUrl: [String],

        date: {
            type: String,
            required: true,
            default: Date.now()
        }
}, { timestamp: true })

const SentSMS = mongoose.model('SentSMS', SentSMSSchema);

module.exports = SentSMS