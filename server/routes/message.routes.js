const router = require('express').Router();
const { sendMessage } = require('../twilio/outbound')
const { recieveMessage } = require('../twilio/inbound');
const User = require('../models/user.model');
const SentSMS = require('../models/sent_sms.model');
const RecievedSMS = require('../models/received_sms.model');

router.post('/outbound', sendMessage);
router.post('/inbound', recieveMessage);

router.get('/findbyuser', async (req, res) => {
    const user = await User.find({ _id: req.params.id })
    if (!user) {
        return res.status(400).json({'message': 'User is not registered.'})
    } else {
        return SentSMS.find({ userId: user._id }) &&
        RecievedSMS.find({ userId: user._id })
    }
})

module.exports = router