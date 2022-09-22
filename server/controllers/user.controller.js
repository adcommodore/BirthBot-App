const User = require('../models/user.model');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { createMessage } = require('../domain/create_message');

module.exports = {

    // @description create user
    // @route POST /user/
    // @access Public

    createUser: (req, res) => {
        const newUser = req.body.user;
        client.lookups.v1.phoneNumbers(newUser.phoneNumber)
            .fetch({countryCode: 'US'})
            // calculate UTCSchedule
            .then(() => {
                return User.create(newUser)
            })
            .then((newUser) => {
                createMessage(
                    newUser.phoneNumber, 
                    `Hi ${newUser.firstName}, I'm BirthBot. I'm a special kind of chatbot focused on providing you with easily accessible, evidence-based information on pregnancy, birth, and postpartum. Go ahead and save my contact info so you know its me texting.`,
                    ['https://media.giphy.com/media/2A1FfWjPqZdpXYb9Ur/giphy.gif','https://vcard.link/card/DCzP.vcf']
                ).catch((err) => {
                    console.log(err)
                })
                return newUser
            })
            .then((newUser) => {
                console.log(newUser)
                res.status(201).json(newUser);
            })
            .catch((err) => {
                console.log("we got here")
                let msg = '';
                if (err.code == 11000) {
                    msg = "Phone number already registered."
                } else {
                    msg = err.message
                }
                console.log('Something went wrong when trying to create a new user');
                res.status(400).json({message: msg, err: err});
            })
    },

    // @description find one user
    // @route GET /user/:id
    // @access Private

    findOneUser: (req, res) => {
        User.findOne({ _id: req.params.id })
            .then((oneUser) => {
                console.log(oneUser);
                res.json(oneUser);
            })
    },

    // @description find all users
    // @route GET /user/
    // @access Private

    findAllUsers: (req, res) => {
        User.find()
            .then((allUsers) => {
                console.log(allUsers);
                res.json(allUsers);
            })
    },

    // @description find all subscribers
    // @route GET /user/subscribed
    // @access Private

    findAllSubscribers: (req, res) => {
        User.find({ subscribed: true })
            .then((allUsers) => {
                console.log(allUsers);
                res.json(allUsers);
            })
    },


    // @description update user
    // @route PUT /user/:id
    // @access Public

    updateUser: (req, res) => {
        User.findOneAndUpdate({_id: req.params.id}, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            EDD: req.body.EDD,
            phoneNumber: req.body.phoneNumber,
            weeklySchedule: req.body.weeklySchedule,
            timeZone: req.body.timeZone,
            dailySchedule: req.body.dailySchedule,
            subscribed: req.body.subscribed,
        }, {
            new: true,
            runValidators: true,
        })
            .then((updatedUser) => {
                console.log(updatedUser);
                res.json(updatedUser);
            })
    }
}