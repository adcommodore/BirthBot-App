const mongoose = require('mongoose');

const SentSMSSchema = new mongoose.Schema({

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

        contentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Content'
        },

        sentToPhoneNumber: {
            type: String,
            required: [ true, "Reciever's phone number required."]
        },

        body: {
            type: String,
            required: [ true, "Message body required."],
            maxlength: [ 1600, "Please shorten the length of your message"]
        },

        date: {
            type: String,
            required: true,
            default: Date.now()
        }
}, { timestamp: true })

const SentSMS = mongoose.model('SentSMS', SentSMSSchema);

module.exports = SentSMS