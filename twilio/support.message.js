const SupportPointer = require('./pointers/support_pointer');
const MessagingResponse = require('twilio').twiml.MessageResponse;
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_SIGNIN,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = {

    init: (req, res, pointer) => {
        pointer.current = 'SUPPORT.INIT'
        pointer.next = 'SUPPORT.EMAIL'
        pointer.save()
        const twiml = new MessagingResponse()
        twiml.message('What is your email address?')
        res.type('text/xml').send(twiml.toString())
    },

    email: (req, res, pointer) => {
        const twiml = new MessagingResponse()
        const response = req.body.Body
        if (isValidEmail('SUPPORT.EMAIL', response)) {
            pointer.current = 'SUPPORT.EMAIL'
            pointer.next = 'SUPPORT.COMPLAINT'
            pointer.email = response
            pointer.save()
            twiml.message('Please describe the issue your experiencing.')
        } else {
            twiml.message('Email format incorrect. Try sending again.')
        }
        res.type('text/xml').send(twiml.toString())
    },

    sendEmail: async (req, res, pointer) => {
        const twiml = new MessagingResponse()
            pointer.current = 'SUPPORT.COMPLAINT'
            pointer.next = 'SUPPORT.SEND'
        const emailFormat = {
            from: process.env.EMAIL_SIGNIN,
            to: [pointer.email, process.env.EMAIL_SIGNIN],
            subject: `Support Ticket #${pointer._id}`,
            text: req.body.Body
        }
        transporter.sendMail(emailFormat, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
        twiml.message("Support ticket sent. Look out for a follow up.")
        res.type('text/xml').send(twiml.toString())
        await SupportPointer.deleteOne({_id: pointer._id})
    },

}