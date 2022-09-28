const User = require('../models/user.model');
const Content = require('../models/content.model');
const SentSMS = require('../models/sent_sms.model')
const date = require('date-fns');
const { createMessage } = require('../domain/create_message');

const weekDayToIndex = {
    0: Sunday,
    1: Monday,
    2: Tuesday,
    3: Wednesday,
    4: Thursday,
    5: Friday,
    6: Saturday
}



const sendScheduledContent = async (userId) => {
    const user = await User.findOne({ _id: userId})
    const lastSMSSent = await SentSMS.findOne({userId: userId, contentGestationWeek: user.gestationWeek}).sort({contentDeliveryIndex: -1})
    const nextDeliveryIndex = lastSMSSent?.deliveryIndex || 0
    const content = await Content.find({deliveryIndex: nextDeliveryIndex, gestationWeek: user.gestationWeek})
    return createMessage(user.phoneNumber, content.body, content.mediaUrl, content)
}

module.exports = async () => {
    const today = new Date()
    const weekDay = weekDayToIndex[today.getDay().toString()]
    // calculate UTC
    const time = "16:30"
    await User.findAll({weekSchedule: weekDay, UTCSchedule: time})
        .then((users) => {
            return Promise.all(users.map((user) => sendScheduledContent(user._id)))
        })
    
}