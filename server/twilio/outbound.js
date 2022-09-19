const SentSMS = require('../models/sent_sms.model');
const User = require('../models/user.model');
const config = require('../config/twilio.config');
const client = require('twilio')(config.accountSid, config.authToken);

const sendMessageWithMedia = async (req, res) => {
    const user = await User.find({ phoneNumber: req.body.phoneNumber })
    if(!user) {
        return res.status(400).json({'message': 'User is not registered.'})
    } else {
        const createMessage = {
            to: req.phoneNumber,
            from: process.env.PHONE_NUMBER,
            body: req.body,
            mediaUrl: req.mediaUrl
        }; 
        if(!req.phoneNumber || !req.body) {
            return res.status(400).json({ 'message': 'Phone number or message body is missing.' })
        } else {
            await client.messages.create(createMessage)
                .then((sentMsg) => {
                    SentSMS.create({
                        userId: req.userId,
                        sentTo: req.phoneNumber,
                        body: req.body
                    })
                    console.log(sentMsg.sid)
                })
        }
    }  
}

const sendMessageNoMedia = async (req, res) => {
    const user = await User.find({ phoneNumber: req.body.phoneNumber })
    if(!user) {
        return res.status(400).json({'message': 'User is not registered.'})
    } else {
        const createMessage = {
            to: req.phoneNumber,
            from: process.env.PHONE_NUMBER,
            body: req.body
            
        }; 
        if(!req.phoneNumber || !req.body) {
            return res.status(400).json({ 'message': 'Phone number or message body is missing.' })
        } else {
            await client.messages.create(createMessage)
                .then((sentMsg) => {
                    SentSMS.create({
                        userId: req.userId,
                        sentTo: req.phoneNumber,
                        body: req.body
                    })
                    console.log(sentMsg.sid)
                })
        }
    }  
}


module.exports = { sendMessageWithMedia, sendMessageNoMedia };