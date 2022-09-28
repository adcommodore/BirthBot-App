const router = require('express').Router();
const AdminController = require('../controllers/admin.controller');
const verifyJWT = require('../middleware/verifyJWT');

    // register administrator

    router.post('/register', AdminController.registerAdmin);

    // login administrator

    router.post('/login', AdminController.loginAdmin);

    // refresh token

    router.get('/refresh', AdminController.refreshToken);
    
    // update administrator

    router.put('/me', verifyJWT, AdminController.updateAdmin);

    // logout administrator

    router.get('/logout', AdminController.logoutAdmin);

module.exports = router

