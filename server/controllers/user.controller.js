const User = require('../models/user.model');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const normalizedTwilio = (twilioError) => ({
    message: twilioError.message, err: true
})
const{ sendMessage }= require('../functions/outbound');


module.exports = {

    // @description create user
    // @route POST /user/
    // @access Public

    createUser: (req, res) => {
        const newUser = req.body.user;
        client.validationRequests
            .create({friendlyName: newUser.firstName + " " + newUser.lastName, phoneNumber: newUser.phoneNumber})
            .then((validationRequests) => {
                console.log(validationRequests)
            })
            .then(() => {
                console.log('creating a user')
                return User.create(newUser)
            })
            .then((newUser) => {
                sendMessage(`${newUser.firstName}, thanks for signing up for BirthBot!`, newUser.phoneNumber)
                return newUser
            })
            .then((newUser) => {
                console.log(newUser)
                res.status(201).json(newUser);
            })
            .catch((err) => {
                console.log("we got here")
                let msg = '';
                // if (res.status(400).json(normalizedTwilio(twilioError)))
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