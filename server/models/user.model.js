const mongoose = require('mongoose');
const differenceInDays = require('date-fns/differenceInDays')

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [ true, "You must enter your first name."],
        minlength: [ 2, "Please enter at least 2 characters."],
        maxlength: [ 20, "Please shorten your first name to under 20 characters."]
    },

    lastName: {
        type: String,
        required: [ true, "You must enter your last name."],
        minlength: [ 1, "Please enter at least 1 characters."],
        maxlength: [ 20, "Please shorten your last name to under 20 characters."]
    },

    estimatedDueDate: {
        type: Date,
        required: [ true, "Your last menstrual period is required to calculate your estimated due date."],
        max: Date.now
    },

    phoneNumber: {
        type: String,
        required: [ true, "A phone number is required to sign up for BirthBot."],
        unique: true, 
        minlength: [ 10, "Please enter a 10 digit phone with no spaces or other characters."],
        maxlength: [ 12, "Please enter a 10 digit phone with no spaces or other characters."],
        set: number => '+1' + number.toString()
    },

    weeklySchedule:[{
        type: String,
        required: [ true, "Please select at least one day each week you would like to recieve a text message with educational information on pregnancy, birth, and postpartum."],
        enum: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ]
    }],

    timeZone: {
        type: String,
        required: [ true, "Please select your time zone." ],
        enum: [
            "Eastern Daylight Time",
            "Central Daylight Time",
            "Mountain Daylight Time",
            "Arizona Mountain Standard Time",
            "Pacific Daylight Time",
            "Alaska Daylight Time",
            "Aleutian Daylight Time",
            "Hawaii Standard Time",
        ],
    },

    dailySchedule: {
        type: String,
        required: [ true, "Please choose the time you would like to recieve a text message with educational information on pregnancy, birth, and postpartum." ],
        enum: [
            "6:00 AM",
            "6:30 AM",
            "7:00 AM",
            "7:30 AM",
            "8:00 AM",
            "8:30 AM",
            "9:00 AM",
            "9:30 AM",
            "10:00 AM",
            "10:30 AM",
            "11:00 AM",
            "11:30 AM",
            "12:00 PM",
            "12:30 PM",
            "1:00 PM",
            "1:30 PM",
            "2:00 PM",
            "2:30 PM",
            "3:00 PM",
            "3:30 PM",
            "4:00 PM",
            "4:30 PM",
            "5:00 PM",
            "5:30 PM",
            "6:00 PM",
            "6:30 PM",
            "7:00 PM",
            "7:30 PM",
            "8:00 PM",
            "8:30 PM",
            "9:00 PM",
            "9:30 PM",
            "10:00 PM",
            "10:30 PM",
            "11:00 PM",
            "11:30 PM",
        ],
    },

    UTCSchedule: {
        type: String,
        required: true,
    }

    subscribed: {
        type: Boolean,
        default: true,
    },
    
},
{
    virtuals: {
        gestationWeek: {
            type: Number,
            get () {
            // current date - gestation start date = number of days / 7 
            // TODO gestational start date
                return Math.floor(differenceInDays(new Date(), this.gestationStartDate)/7)
            }
        }
    },
    
    timestamps: true, minimize: false});

const User = mongoose.model('User', UserSchema);

module.exports = User

