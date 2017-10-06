'use strict';

const express = require('express'),
  controller = require('./file.controller');

const router = express.Router();

router.get('/teamLogos', controller.getTeamLogos);
router.post('/upload', controller.uploadFile);

module.exports = router;