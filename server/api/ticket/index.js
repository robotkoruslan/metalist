'use strict';

var express = require('express');
var controller = require('./ticket.controller');
import * as auth from '../../auth/auth.service.js';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/:id/buy', auth.isAuthenticated(), controller.buy);



module.exports = router;
