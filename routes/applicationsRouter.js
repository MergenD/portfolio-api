const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');
const authMiddleware = require('../middleware/auth');

router.post('/', applicationsController.createApplication);
router.get('/', authMiddleware, applicationsController.getApplications);

module.exports = router;
