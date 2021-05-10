'use strict';

const express = require('express'),
  controller = require('./ticket.controller');
import * as auth from '../../auth/auth.service.js';

const router = express.Router();

router.get('/ticket/:ticketNumber', controller.getTicketPdfById);
router.get('/accessCode/:accessCode', controller.getTicketByAccessCode);
router.get('/', auth.isAuthenticated(), controller.getMyTickets);

router.get('/abonticket/print/:accessCode', controller.print);
router.get('/abonticket/:accessCode', auth.hasRole('cashier' || 'api'), controller.getAbonticketTicketByAccessCode);
router.get('/useabonticket/:ticketId', auth.hasRole('cashier'), controller.useAbonementTicket);
router.get('/statistics', auth.hasRole('cashier' || 'api'), controller.getStatistics);

router.get('/tribune/:tribune/code/:code', auth.hasRole('steward'), controller.use);
router.get('/sold-tickets', auth.hasRole('steward'), controller.getTicketsForCheckMobile);
router.get('/amount-sold-tickets', auth.hasRole('admin'), controller.getTicketsAmountSold);
router.get('/count/:tribune', auth.hasRole('steward'), controller.getCountValidTicketsByTribune);

router.delete('/:id', auth.hasRole('cashier' || 'api'), controller.deleteTicketAndClearSeatReservationById);

module.exports = router;
