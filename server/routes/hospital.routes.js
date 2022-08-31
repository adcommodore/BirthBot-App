const router = require('express').Router();
const HospitalController = require('../controllers/hospital.controller');
const verifyJWT = require('../middleware/verifyJWT');

    // create hospital data

    router.post('/', verifyJWT, HospitalController.createHospital);

    // find all hospital data

    router.get('/', HospitalController.findAllHospitals)

    // find hospital data by name

    // router.get('/:hospitalName', HospitalController.findHospitalByName);

    // update hospital data

    router.put('/:id', verifyJWT, HospitalController.updateHospital);

module.exports = router
