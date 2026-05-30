const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');
const authMiddleware = require('../middleware/auth');

router.post('/', messagesController.createMessage);
router.get('/', authMiddleware, messagesController.getMessages);

module.exports = router;
