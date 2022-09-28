const { createMessage } = require('../domain/create_message');

const sendMessage = async (req, res) => {
    return createMessage(req.phoneNumber, req.body, req.mediaUrl)
        .catch((err) => {
            res.status(400).json({'message': err})
        })
}


module.exports = { sendMessage };