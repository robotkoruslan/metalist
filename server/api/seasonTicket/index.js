'use strict';

let express = require('express');
let controller = require('./seasonTicket.controller.js');
import * as auth from '../../auth/auth.service.js';

const router = express.Router();

router.get('/season-tickets', auth.hasRole('cashier'), controller.getSeasonTickets);
router.get('/block-row', auth.hasRole('admin'), controller.getBlocks);

router.post('/:slug', auth.hasRole('admin'), controller.createSeasonTicket);
router.delete('/:slug', auth.hasRole('admin'), controller.deleteSeasonTicket);
router.post('/registration/:slug', auth.hasRole('cashier'), controller.confirmSeasonTicket);

router.post('/addBlock/sector/:sector/row/:row', auth.hasRole('admin'), controller.blockRow);
router.delete('/deleteBlock/sector/:sector/row/:row', auth.hasRole('admin'), controller.deleteBlockRow);

module.exports = router;
