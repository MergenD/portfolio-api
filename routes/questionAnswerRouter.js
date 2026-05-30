const express = require('express');
const router = express.Router();
const questionAnswerController = require('../controllers/questionAnswerController');
const authMiddleware = require('../middleware/auth');

router.post(
  '/answer',
  authMiddleware,
  questionAnswerController.answerQuestions
);

module.exports = router;
