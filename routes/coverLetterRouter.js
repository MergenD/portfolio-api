const express = require('express');
const router = express.Router();
const coverLetterController = require('../controllers/coverLetterController');
const authMiddleware = require('../middleware/auth');

router.post('/tailor', authMiddleware, coverLetterController.tailorCoverLetter);

module.exports = router;
