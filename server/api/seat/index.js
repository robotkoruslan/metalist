'use strict';

const express = require('express');
const controller = require('./seat.controller.js');

const router = express.Router();

router.get('/reserved-on-match/:id/sector/:sector', controller.getReservedSeats);

module.exports = router;
