const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weather.controller');

router.get('/now', weatherController.getNow);
router.get('/by-date', weatherController.getByDate);

module.exports = router;
