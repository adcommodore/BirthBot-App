const SentSMS = require('../models/sent_sms.model');
const User = require('../models/user.model');
const config = require('../config/twilio.config');
const client = require('twilio')(config.accountSid, config.authToken);

const createMessage = async (phoneNumber, body, mediaUrl = null, content = null) => {
    const user = await User.findOne({ phoneNumber: phoneNumber });
    if(!user) {
        return Promise.reject('User is not registered.')
    } else {
        const sms = {
            to: phoneNumber,
            from: process.env.PHONE_NUMBER,
            body: body,
        }; 
        if (mediaUrl !== null) {
            sms.mediaUrl = mediaUrl
        }
        if (content !== null) {
            sms.content = content
        }
        if(!phoneNumber || !body) {
            return Promise.reject('Phone number or message body is missing.')
        } else {
            return client.messages.create(sms)
                .then((sentMsg) => {
                    SentSMS.create({
                        userId: user._id,
                        contentId: content?._id,
                        contentDeliveryIndex: content?.deliveryIndex,
                        contentGestationWeek: content?.gestationWeek,
                        sentTo: phoneNumber,
                        body: body,
                        mediaUrl: mediaUrl,
                    })
                    console.log(sentMsg.sid)
                })
        }
    }  
}



module.exports = { createMessage }
