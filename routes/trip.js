const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

router.get('/', tripController.list);
router.get('/edit/:id', tripController.editTrip)

router.get('/new', tripController.new);
router.post('/', tripController.newPost);
router.put('/:id', tripController.updateTrip)
router.delete('/:id', tripController.deleteTrip)

router.get('/:id', tripController.tripDetails)

module.exports = router;