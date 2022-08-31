const config = require('../config/twilio.config')
const client = require('twilio')(config.accountSid, config.authToken);

async function sendMessage(body, phoneNumber) {
    try {
        const message = await client.messages.create({
            to: phoneNumber,
            from: process.env.PHONE_NUMBER,
            body: body
        });
        return message;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { sendMessage };