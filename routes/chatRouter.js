const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/auth');

router.post('/', chatController.chatWithAI);
router.get('/history', authMiddleware, chatController.getChatHistory);

module.exports = router;
