const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, questionsController.getQuestions);

module.exports = router;
