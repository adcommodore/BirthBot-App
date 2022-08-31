const Hospital = require('../models/hospital.model');

module.exports = {

    // @description create hospital data
    // @route POST /hospital/
    // @access Private

    createHospital: (req, res) => {
        Hospital.create(req.body)
            .then((newHospital) => {
                console.log(newHospital);
                res.json(newHospital);
            })
            .catch((err) => {
                console.log('Something went wrong when creating a hospital.');
                res.status(400).json(err);
            })
    },

    // @description find all hospital data
    // @route GET /hospital/
    // @access Public
    
    findAllHospitals: (req, res) => {
        Hospital.find()
            .then((allHospitals) => {
                console.log(allHospitals);
                res.json(allHospitals);
            })
            .catch((err) => {
                console.log('Failed to find all hospitals.');
                res.json({ message: 'Failed to find all hospitals.', error: err})
            })
    },

    // @description find hospital by name
    // @route GET /hospital/:id
    // @access Public
    
    // findHospitalByName: (req, res) => {
    // Hospital.find({ hospitalName: /.*req.body*/i })
    //         .then((oneHospital) => {
    //             console.log(oneHospital);
    //             res.json(oneHospital);
    //         })
    //         .catch((err) => {
    //             console.log('Something went wrong when trying to find hospital.');
    //             res.json({ message: 'Something went wrong when trying to find hospital.', error: err})
    //         })
    // },


    // @description update hospital data
    // @route PUT /hospital/:id
    // @access Private

    updateHospital: (req, res) => {
        Hospital.findOneAndUpdate({_id: req.params.id}, {
            hospitalName: req.body.hospitalName,
            hospitalAddress: req.body.hospitalAddress,
            cSection: req.body.cSection,
            EED: req.body.EED,
            episiotomy: req.body.episiotomy
        }, {
            new: true,
            runValidators: true,
        })
            .then((updatedHospital) => {
                console.log(updatedHospital);
                res.json(updatedHospital);
            })
            .catch((err) => {
                console.log('Something went wrong when trying to update hospital data.');
                res.status(400).json(err);
            })
    }
}




