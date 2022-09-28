const router = require('express').Router();
const ContentController = require('../controllers/content.controller');
const verifyJWT = require('../middleware/verifyJWT');

    // create content

    router.post('/', ContentController.createContent);

    // find one

    router.get('/:id', ContentController.findContent);

    // find all

    router.get('/', ContentController.findAllContent);

    // update content

    router.put('/:id', ContentController.updateContent);

module.exports = router









