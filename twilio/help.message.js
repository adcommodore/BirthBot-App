const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = {

    helpMenu: (req, res) => {
        const twiml = new MessagingResponse()
        twiml.message('Here is a list of commands:\n\nSTAT --Hospital culture is one of the biggest risk factors for receiving medical interventions. Search for the c-section, episiotomy, and early elective delivery rate for 1632 hospitals across the U.S. Sourced by www.leapfroggroup.org.\nQUESTION --Ask a question related to birth, pregnancy, or postpartum.\nSUPPORT --Submit a support ticket.\nSTOP --To unsubscribe at anytime.')
        res.type('text/xml').send(twiml.toString())
    },

}