'use strict';

import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import User from '../api/user/user.model';

let validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
  // Validate jwt
    .use(function (req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.cookies && req.cookies.token) {
        req.headers.authorization = 'Bearer ' + req.cookies.token;
      }
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function (req, res, next) {
      User.findById(req.user._id).exec()
        .then(user => {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;
          return next();
        })
        .catch(err => next(err));
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >=
        config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, role) {
  if (role == "api") {
    return jwt.sign({_id: id, role: role}, config.secrets.session, {
      expiresIn: 60 * 60 * 24
    });
  }
  return jwt.sign({_id: id, role: role}, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

/**
 * Set token cookie directly for facebook oAuth strategies
 */
export function setFacebookTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('Похоже, вы не авторизованы. Попробуйте еще.');
  }
  let token = signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  res.redirect('/?');
}

/**
 * Set token cookie directly for google oAuth strategies
 */
export function setGoogleTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('Похоже, вы не авторизованы. Попробуйте еще.');
  }
  let token = signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  res.redirect('/?#-=-');
}
