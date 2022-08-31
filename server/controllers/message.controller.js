const Message = require('../models/message.model');
const User = require('../models/user.model')
const { sendMessage } = require('../functions/outbound');

module.exports = {

    // @description save and send message
    // @route POST /msg/send
    // @access Public

    recordMessage: async (req, res) => {
        const { body, userId } = req.body;
    
        if(!body || !userId) 
            return res.json('Cannot send message without content or userId.');
    
        const user = await User.findOne({_id: req.userId});
        if (!user) 
            return res.json('User not registered.')
            
        await Message.create({ 
            user: user.id,
            to: user.phoneNumber,
            from: process.env.PHONE_NUMBER,
            body: req.body.body
        })
            .then((newMessage) => {
                console.log(newMessage)
            res.json(newMessage)
            })
            .catch((err) => {
                console.log('Something went wrong when trying to send a text message');
                res.status(400).json(err);
            })
            
        
        const result = await sendMessage(body, user.phoneNumber);
        console.log(result.sid);
        
        res.end();
    },

    // @description get all message by user
    // @route GET /msg/?userId=:id
    // @access Private

    getMessagesByUserId: async (req, res) => {
        Message.findOne({ userId })
            .then((message) => {
                console.log(message);
                res.json(message);
            })
            .catch((err) => {
                console.log('Failed to find messages for this user.');
                res.json({ message: 'Failed to find messages for this user.', error: err})
            })
    },

}
