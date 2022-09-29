const HospitalPointer = require('./pointers/hospital_pointer');
const Hospital = require('../models/hospital.model');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

//validate states
const isValidForState = (res) => {
  res.match([
    /Alabama/i, /AL/i,
    /Alaska/i, /AK/i,
    /Arizona/i, /AZ/i,
    /Arkansas/i, /AR/i,
    /California/i, /CA/i,
    /Colorado/i, /CO/i,
    /Connecticut/i, /CT/i,
    /Delaware/i, /DE/i,
    /District of Columbia/i, /DC/i,
    /Florida/i, /FL/i,
    /Georgia/i, /GA/i,
    /Hawaii/i, /HI/i,
    /Idaho/i, /ID/i,
    /Illinois/i, /IL/i,
    /Indiana/i, /IN/i,
    /Iowa/i, /IA/i,
    /Kansas/i, /KS/i,
    /Kentucky/i, /KY/i,
    /Louisiana/i, /LA/,
    /Maine/i, /ME/i,
    /Maryland/i, /MD/i,
    /Massachusetts/i, /MA/i,
    /Michigan/i, /MI/i,
    /Minnesota/i, /MN/i,
    /Mississippi/i, /MS/i,
    /Missouri/i, /MO/i,
    /Montana/i, /MT/i,
    /Nebraska/i, /NE/i,
    /Nevada/i, /NV/i,
    /New Hampshire/i, /NH/i,
    /New Jersey/i, /NJ/i,
    /New Mexico/i, /NM/i,
    /New York/i, /NY/i,
    /North Carolina/i, /NC/i,
    /North Dakota/i, /ND/i,
    /Ohio/i, /OH/i,
    /Oklahoma/i, /OK/i,
    /Oregon/i, /OR/i,
    /Pennsylvania/i, /PA/i.dotAll,
    /Rhode Island/i, /RI/i,
    /South Carolina/i, /SC/i,
    /South Dakota/i, /SD/i,
    /Tennessee/i, /TN/i,
    /Texas/i, /TX/i,
    /Utah/i, /UT/i,
    /Vermont/i, /VT/i,
    /Virginia/i, /VA/i,
    /Washington/i, /WA/i,
    /West Virginia/i, /WV/i,
    /Wisconsin/i, /WI/i,
    /Wyoming/i, /WY/i
  ])
  return true
}

module.exports = {

  init: (req, res, pointer) => {
    pointer.current = 'HOSPITAL.INIT'
    pointer.next = 'HOSPITAL.SELECT_STATE'
    pointer.save()
    const twiml = new MessagingResponse()
    twiml.message('What state is the hospital in?')
    res.type('text/xml').send(twiml.toString())
  },

  selectState: (req, res, pointer) => {
    const twiml = new MessagingResponse()
    const response = req.body.Body
    if (isValidForState('HOSPITAL.SELECT_STATE', response)) {
      pointer.current = 'HOSPITAL.SELECT_STATE'
      pointer.next = 'HOSPITAL.SELECT_CITY'
      pointer.selectedState = response
      pointer.save()
      twiml.message('What city is the hospital in?')
    } else {
      twiml.message('Try again.')
    }
    res.type('text/xml').send(twiml.toString())
  },

  selectCity: (req, res, pointer) => {
    const twiml = new MessagingResponse()
      pointer.current = 'HOSPITAL.SELECT_CITY'
      pointer.next = 'HOSPITAL.SEARCH_BY_NAME'
      pointer.selectedCity = req.body.Body
      pointer.save()
    twiml.message("What is part of the hospital's name?")
    res.type('text/xml').send(twiml.toString())
  },

  searchByName: async (req, res, pointer) => {
    const twiml = new MessagingResponse()
    // message state and city to case-ignore
    const hospitals = await Hospital.find({
      state: new RegExp(pointer.selectedState, 'i'),
      city: new RegExp(pointer.selectedCity, 'i'),
      name: new RegExp(`.*${req.body.Body}.*`, 'i')
    }).limit(10).exec()
    console.log(hospitals)
  
    if (hospitals.length > 0) {
      pointer.current = 'HOSPITAL.SEARCH_BY_NAME'
      pointer.next = 'HOSPITAL.SELECT_HOSPITAL'
      pointer.nameSearch = req.body.Body
      pointer.hospitals = hospitals.map(hospital => hospital.id)
      pointer.save()
      // Builds a list of newline-separated indexed hospitals
      const resultCountMessages = hospitals
        .map((hospital, i) => `${i + 1}) ${hospital.name}`)
        .join('\n')
  
      twiml.message(`Here's a list of hospitals we found:\n\n${resultCountMessages}\n\nPlease respond with the # of your selection:`)
    } else {
      pointer.current = 'HOSPITAL.SEARCH_BY_NAME'
      pointer.next = 'MESSAGING.COMPLETE'
      pointer.nameSearch = req.body.Body
      pointer.save()
      twiml.message('Failed to find any hospitals matching that name.')
    }
    res.type('text/xml').send(twiml.toString())
  },
  
  selectHospital: async (req, res, pointer) => {
    const userSelection = parseInt(req.body.Body)
    const hospitalId = pointer.hospitals[userSelection - 1]
    const hospital = await Hospital.findOne({ _id: hospitalId })
    const twiml = new MessagingResponse()
    twiml.message(`Here are the stats for ${hospital.name}:\n\nC-Section Rate: ${hospital.cSection}\nEpisiotomy Rate: ${hospital.episiotomy}\nElective Delivery Rate: ${hospital.electiveDelivery}`)
    res.type('text/xml').send(twiml.toString())
    await HospitalPointer.deleteOne({_id: pointer._id})
  },

}









