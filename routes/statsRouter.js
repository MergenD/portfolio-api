const express = require('express');
const {
  getAllStats,
  getAllVisits,
  deleteVisit,
  deleteVisitByIp,
} = require('../controllers/statControllers');
const router = express.Router();

router.use(require('../middleware/auth'));
router.get('/', getAllStats);
router.get('/visits', getAllVisits);
router.delete('/visits', deleteVisit);
router.delete('/visits/:ip', deleteVisitByIp);

module.exports = router;
