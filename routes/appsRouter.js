const express = require('express');
const {
  createApp,
  updateApp,
  getAllApps,
  getAppsMonthly,
} = require('../controllers/appControllers');
const router = express.Router();

router.use(require('../middleware/auth'));
router.get('/:month/:year', getAllApps);
router.get('/monthly/:month/:year', getAppsMonthly);
router.post('/', createApp);
router.put('/', updateApp);

module.exports = router;
