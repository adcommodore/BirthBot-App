const User = require('../models/user.model');
const HospitalPointer = require('./pointers/hospital_pointer');
const SupportPointer = require('./pointers/support_pointer');
const hospitalMsg = require('./hospital.message');
const helpMsg = require('./help.message');
const davinciMsg = require('./davinci.message');
const supportMsg = require('./support.message');

const makePointer = (req, res, user) => {
    // Check twilio message
    if (req.body.Body.match(/.*STAT.*/i)) {
        return HospitalPointer.create({
        next: 'HOSPITAL.INIT',
        userId: user._id,
        phoneNumber: req.body.From
        })
    } else if (req.body.Body.match(/.*QUESTION.*/i)) {
      return {next: 'QUESTION'}
    } else if (req.body.Body.match(/.*SUPPORT.*/i)) {
      return SupportPointer.create({
        next: 'SUPPORT.INIT',
        userId: user._id,
        phoneNumber: req.body.From
      })
    } else if (req.body.Body.match(/.*MENU.*/i)) {
      return {next: 'MENU'}
    } 
}

const recieveMessage = async (req, res) => {
    const user = await User.findOne({ phoneNumber: req.body.From})
    if (!user) {
      return res.status(404).json({ message: 'User not registered.'})
    }
    let pointer = await HospitalPointer.findOne({ phoneNumber: user.phoneNumber }) 
      || SupportPointer.findOne({ phoneNumber: user.phoneNumber })
    if (!pointer) {
        pointer = await makePointer(req, res, user)
    } 
    switch (pointer.next) {
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
        case 'QUESTION':
          davinciMsg.answer(req, res, pointer)
          break
        case 'SUPPORT.INIT':
          supportMsg.init(req, res, pointer)
          break
        case 'SUPPORT.EMAIL':
          supportMsg.email(req, res, pointer)
          break
        case 'SUPPORT.COMPLAINT':
          supportMsg.sendEmail(req, res, pointer)
        break
        case 'MENU':
        default:
          helpMsg.helpMenu(req, res)
      }
}

module.exports = { recieveMessage }
    