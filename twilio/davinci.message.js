const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = {

    answer: (req, res) => {
        const twiml = new MessagingResponse()
        twiml.message('This feature is not yet available. Please check back later.')
        res.type('text/xml').send(twiml.toString())
    },

}