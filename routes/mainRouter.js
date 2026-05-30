const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRouter'));
router.use('/title', require('./visitsRouter'));
router.use('/stats', require('./statsRouter'));
router.use('/apps', require('./appsRouter'));
router.use('/chat', require('./chatRouter'));
router.use('/cover-letter', require('./coverLetterRouter'));
router.use('/question-answer', require('./questionAnswerRouter'));
router.use('/questions', require('./questionsRouter'));
router.use('/messages', require('./messagesRouter'));
router.use('/applications', require('./applicationsRouter'));

module.exports = router;
