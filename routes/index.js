const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.index);
router.get('/locations', indexController.locations);
router.post('/locationInfo', indexController.locationInfo);

module.exports = router;