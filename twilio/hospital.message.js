const HospitalPointer = require('./pointers/hospital_pointer.model.js');
const Hospital = require('../models/hospital.model');

module.exports = {

  init: (user, req, res, pointer) => {
    const { body } = req
    HospitalPointer.save({ current: 'HOSPITAL.INIT', next: 'HOSPITAL.NEXT' })
    const twiml = new twiml.MessageResponse()
    twiml.message = 'Which state is the hospital in?'
    res.type('text/xml').send(twiml.toString())
  },

  selectState: (user, req, res, pointer) => {
    const twiml = new twiml.MessageResponse()
    const response = req.body.message
    if (isValidForState('HOSPITAL.SELECT_STATE', response)) {
      HospitalPointer.save({
        current: 'HOSPITAL.SELECT_STATE',
        next: 'HOSPITAL.SELECT_CITY',
        selectedState: req.body.message
      })
      twiml.message = 'Which city is the hospital in?'
    } else {
      twiml.message = invalidResponse() // "That wasn't what I was expecting... try again?
    }
    res.type('text/xml').send(twiml.toString())
  },

  selectCity: ( user, req, res, pointer) => {
    const twiml = new twiml.MessageResponse()
    HospitalPointer.save({
      current: 'HOSPITAL.SELECT_CITY',
      next: 'HOSPITAL.SEARCH_BY_NAME',
      selectedCity: req.body.message
    })
    twiml.message = 'What is a part of the name of the hospital?'
    res.type('text/xml').send(twiml.toString())
  },

  searchByName: (user, req, res, pointer) => {
    const twiml = new twiml.MessageResponse()

    // message state and city to case-ignore
    const hospitals = Hospital.findMany({
      state: new RegExp(RegExp.escape(pointer.selectedState)),
      city: new RegExp(RegExp.escape(pointer.selectedCity)),
      name: new RegExp(`.*${req.body.message}.*`, 'i')
    }).limit(10)
  
    if (hospitals.length > 0) {
      HospitalPointer.save({
        current: 'HOSPITAL.SEARCH_BY_NAME',
        next: 'HOSPITAL.SELECT_HOSPITAL',
        nameSearch: req.body.message,
        hospitals: hospitals.map(hospital => hospital.id)
      })
  
      // Builds a list of newline-separated indexed hospitals
      const resultCountMessages = hospitals
        .map((hospital, i) => `${i + 1}) ${hospital.name}`)
        .join('\n')
  
      twiml.message = `Here's a list of hospitals we found:
  ${resultCountMessages}
  Please respond with the number of your selection:`
    } else {
      HospitalPointer.save({
        current: 'HOSPITAL.SEARCH_BY_NAME',
        next: 'HOSPITAL.SEARCH_BY_NAME',
        nameSearch: req.body.message
      })
      twiml.message =
        'Failed to find any hospitals matching that name.'
    }
    res.type('text/xml').send(twiml.toString())
  },
  
  selectHospital: (user, req, res, pointer) => {
    const userSelection = parseInt(req.body.message)
    const hospitalId = HospitalPointer.hospitals[userSelection - 1]
    const hospital = Hospital.findOne({ _id: hospitalId })
    HospitalPointer.save({
      current: 'HOSPITAL.SELECT_HOSPITAL',
      next: 'MESSAGING.COMPLETE',
      selectedHospital: hospitalId
    })
    const twiml = new twiml.MessageResponse()
    twiml.message = `Here's the stats for ${hospital.name}:\n\n${hospital.stats()}`
    res.type('text/xml').send(twiml.toString())
  }

}









