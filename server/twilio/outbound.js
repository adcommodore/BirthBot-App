const SentSMS = require('../models/sent_sms.model');
const User = require('../models/user.model');
const config = require('../config/twilio.config');
const client = require('twilio')(config.accountSid, config.authToken);
const { createMessage } = require('../domain/create_message');

const sendMessage = async (req, res) => {
    return createMessage(req.phoneNumber, req.body, req.mediaUrl)
        .catch((err) => {
            res.status(400).json({'message': err})
        })
}


module.exports = { sendMessage };