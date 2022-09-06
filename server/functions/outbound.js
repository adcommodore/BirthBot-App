const config = require('../config/twilio.config')
const client = require('twilio')(config.accountSid, config.authToken);


async function sendMessage(body, phoneNumber) {
    try {
        const createMessage = {
            to: phoneNumber,
            from: process.env.PHONE_NUMBER,
            body: body
        }
        console.log(createMessage)
        const message = await client.messages.create(createMessage);
        return message;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { sendMessage };