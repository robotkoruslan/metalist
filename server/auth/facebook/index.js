'use strict';

import express from 'express';
import passport from 'passport';
import {setFacebookTokenCookie} from '../auth.service';

let router = express.Router();

router
    .get('/', passport.authenticate('facebook', {
        scope: ['email'],
        failureRedirect: '/signup',
    }))
    .get('/callback', passport.authenticate('facebook', {
        failureRedirect: '/signup',
    }), setFacebookTokenCookie);

export default router;
