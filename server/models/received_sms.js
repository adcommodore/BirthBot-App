const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

        recievedFromPhoneNumber: {
            type: String,
            required: [ true, "Sender's phone number required."]
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

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message