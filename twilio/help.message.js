const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = {

    helpMenu: (req, res) => {
        const twiml = new MessagingResponse()
        twiml.message('Here is a list of commands to assist you:\n\nHOSPITAL --Search for the C-Section, Episiotomy, and Early Elective Delivery Rate for 1632 Hospitals across the U.S.\nQUESTION --Ask a question related to birth, pregnancy, postpartum, or breastfeeding.\nSUPPORT --Sumbit a support ticket.\nSTOP --To unsubscribe at anytime.')
        console.log(twiml.toString())
        res.type('text/xml').send(twiml.toString())
    },

}