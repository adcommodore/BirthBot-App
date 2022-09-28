const User = require('../models/user.model');
const Pointer = require('./pointers/hospital_pointer.model');
const hospitalMsg = require('../twilio/hospital.message');

const makePointer = (req, res, user) => {
    // Check twilio message
    if (req.body.message.match(/.*HOSPITAL.*/i)) {
        return Pointer.create({
        next: 'HOSPITAL.INIT',
        userId: user.id,
        phone: req.body.phone
        })
    } else if (req.body.message.match(/.*HELP.*/i)) {
        return Pointer.create({
        next: 'HELP',
        userId: user.id,
        phone: req.body.phone
        })
    }
}

const recieveMessage = async (req, res) => {
    const user = await User.findOne({ phoneNumber: res.body.phoneNumber })

    let pointer = await Pointer.findOne({ phone: res.body.phoneNumber || user.phoneNumber })
    if (!pointer) {
        pointer = makePointer(req, res, user)
    } else {
      // What do we do about abandoned sessions
      // OR
      // What do we do about interrupted sessions
    }

    switch (pointer.next) {
        case 'MESSAGING.COMPLETE':
          figureOutWhichConversationTypeWeAreIn()
          break
        case 'HOSPITAL.INIT':
          hospitalMsg.init(req, res, pointer)
          break
        case 'HOSPITAL.SELECT_STATE':
          hospitalMsg.selectState(req, res, pointer)
          break
        case 'HOSPITAL.SELECT_CITY':
          hospitalMsg.selectCity(req, res, pointer)
          break
        case 'HOSPITAL.SEARCH_BY_NAME':
          hospitalMsg.searchByName(req, res, pointer)
          break
        case 'HOSPITAL.SELECT_HOSPITAL':
          hospitalMsg.selectHospital(req, res, pointer)
          break
        case 'HELP':
          respondWithHelp(req, res, pointer)
          break
        default:
          figureOutWhichConversationTypeWeAreIn()
      }
}

module.exports = { recieveMessage }
    