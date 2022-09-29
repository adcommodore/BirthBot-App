const User = require('../models/user.model');
const Pointer = require('./pointers/hospital_pointer.model');
const hospitalMsg = require('./hospital.message');
const helpMsg = require('./help.message');

const makePointer = (req, res, user) => {
    // Check twilio message
    if (req.body.Body.match(/.*HOSPITAL.*/i)) {
        return Pointer.create({
        next: 'HOSPITAL.INIT',
        userId: user._id,
        phoneNumber: req.body.From
        })
    } 
      return {next: 'MENU'}
}

const recieveMessage = async (req, res) => {
    const user = await User.findOne({ phoneNumber: req.body.From})
    if (!user) {
      return res.status(404).json({ message: 'User not registered.'})
    }
    let pointer = await Pointer.findOne({ phoneNumber: user.phoneNumber })
    if (!pointer) {
        pointer = await makePointer(req, res, user)
    } 
    console.log(pointer._id)
    switch (pointer.next) {
        case 'MESSAGING.COMPLETE':
          hospitalMsg.complete(req, res)
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
        default:
          helpMsg.helpMenu(req, res)
      }
}

module.exports = { recieveMessage }
    