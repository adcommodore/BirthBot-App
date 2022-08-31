const router = require('express').Router();
const UserController = require('../controllers/user.controller');
const verifyJWT = require('../middleware/verifyJWT');

    // create user

    router.post('/', UserController.createUser);

    // find one user

    router.get('/:id', UserController.findOneUser);

    // find all users

    router.get('/', verifyJWT, UserController.findAllUsers);

    // find all subscribers 

    router.get('/subscribed/', verifyJWT, UserController.findAllSubscribers);

    // update user

    router.put('/:id', verifyJWT, UserController.updateUser);

module.exports = router