'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

const router = new Router();

router.get('/', controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/temporary-password', controller.generatePassword);
router.put('/recovery-password', controller.recoveryPassword);
router.put('/:id/change-role/:role', auth.hasRole('admin'), controller.setRole);

module.exports = router;
