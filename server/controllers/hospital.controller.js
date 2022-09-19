const Hospital = require('../models/hospital.model');

module.exports = {
    
    findHospitalByName: (req, res) => {
    Hospital.find({ hospitalName: new RegExp(`.*${req.body}.*`, 'i')})
            .then((oneHospital) => {
                console.log(oneHospital);
                res.json(oneHospital);
            })
            .catch((err) => {
                console.log('Something went wrong when trying to find hospital.');
                res.json({ message: 'Something went wrong when trying to find hospital.', error: err})
            })
    },
    
}




