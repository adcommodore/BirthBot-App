const router = require('express').Router();
const MsgController = require('../controllers/message.controller');

router.post('/send', MsgController.recordMessage);
router.get('/?userId=:id', MsgController.getMessagesByUserId);

module.exports = router