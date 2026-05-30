const express = require('express');
const { createVisit, updateVisit } = require('../controllers/visitControllers');
const router = express.Router();

router.get('/', createVisit);
router.get('/:id', updateVisit);

module.exports = router;
