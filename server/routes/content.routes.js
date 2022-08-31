const router = require('express').Router();
const ContentController = require('../controllers/content.controller');
const verifyJWT = require('../middleware/verifyJWT');

    // create content

    router.post('/', verifyJWT, ContentController.createContent);

    // find one

    router.get('/:id', verifyJWT, ContentController.findContent);

    // find all

    router.get('/', verifyJWT, ContentController.findAllContent);

    // find by index

    // router.get('/index', ContentController.findByIndex);

    // update content

    router.put('/:id', verifyJWT, ContentController.updateContent);

module.exports = router









