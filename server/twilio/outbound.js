const SentSMS = require('../models/sent_sms.model');
const User = require('../models/user.model');
const config = require('../config/twilio.config');
const client = require('twilio')(config.accountSid, config.authToken);

const sendMessage = async (req, res) => {
    const user = await User.find({ phoneNumber: req.body.phoneNumber })
    if(!user) {
        return res.status(400).json({'message': 'User is not registered.'})
    } else {
        const createMessage = {
            to: req.body.phoneNumber,
            from: process.env.PHONE_NUMBER,
            body: req.body.body
        }; 
        if(!req.body.phoneNumber || !req.body.body) {
            return res.status(400).json({ 'message': 'Phone number or message body is missing.' })
        } else {
            await client.messages.create(createMessage)
                .then((sentMsg) => {
                    SentSMS.create({
                        userId: user._id,
                        sentTo: req.body.phoneNumber,
                        body: req.body.body
                    })
                    console.log(sentMsg)
                })
        }
    }  
}


module.exports = { sendMessage };