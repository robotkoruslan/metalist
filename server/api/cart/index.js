'use strict';

const express = require('express');
const controller = require('./cart.controller');

const router = express.Router();

router.post('/', controller.createCart);
router.get('/my-cart', controller.getCart);

router.post('/addSeat', controller.addSeatToCart);
router.delete('/match/:matchId/seat/:slug', controller.deleteSeatFromCart);

module.exports = router;
