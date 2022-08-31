const User = require('../models/user.model');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = {

    // @description create user
    // @route POST /user/
    // @access Public

    createUser: (req, res) => {
        User.create(req.body)
            .then((newUser) => {
                console.log({ 'success': `New user ${firstName} created!` })
                res.status(201).json({ 'success': `New user ${firstName} created!` });
                client.validationRequests
                    .create({friendlyName: newUser.firstName + newUser.lastName, phoneNumber: newUser.phoneNumber})
                    .then(validation_request => console.log(validation_request))
            })
            .catch((err) => {
                console.log('Something went wrong when trying to create a new user');
                res.status(400).json(err);
            })
    },

    // @description find one user
    // @route GET /user/:id
    // @access Private

    findOneUser: (req, res) => {
        User.findOne({_id: req.params.id})
            .then((oneUser) => {
                console.log(oneUser);
                res.json(oneUser);
            })
            .catch((err) => { 
                console.log('Something went wrong when trying to find user.');
                res.json({ message: 'Something went wrong when trying to find user.', error: err });
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
            .catch((err) => {
                console.log('Something went when trying to find all the users.');
                res.json({ message: 'Something went wrong when trying to find all the users.', error: err });
            })
    },

    // @description find all subscribers
    // @route GET /user/subscribed
    // @access Private

    findAllSubscribers: (req, res) => {
        User.find({ subscribed: true})
            .then((allUsers) => {
                console.log(allUsers);
                res.json(allUsers);
            })
            .catch((err) => {
                console.log('Something went when trying to find all the subscribers.');
                res.json({ message: 'Something went wrong when trying to find all the subscribers.', error: err });
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
            .catch((err) => {
                console.log('Something went wrong when updated user.');
                res.status(400).json(err);
            })
    }
}