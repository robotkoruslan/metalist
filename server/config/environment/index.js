'use strict';

var path = require('path');
var _ = require('lodash');
import * as log4js from 'log4js';

function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

// All configurations will extend these options
// ============================================
let all = {
    env: process.env.NODE_ENV,
    domain: process.env.DOMAIN,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    // Should we populate the DB with sample data?
    seedDB: false,

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'metalist-tickets-secret'
    },


    facebook: {
        clientID: process.env.FACEBOOK_ID || 'id',
        clientSecret: process.env.FACEBOOK_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/facebook/callback'
    },

    google: {
        clientID: process.env.GOOGLE_ID || 'id',
        clientSecret: process.env.GOOGLE_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/google/callback'
    },

    mailer: {
        auth: {
            user: process.env.MAILER_AUTH_USER || 'user@example.com',
            pass: process.env.MAILER_AUTH_PASS || 'password'
        },
        from: 'noreply@examaple.com'
    },
    liqpay: {
        publicKey: process.env.LIQPAY_PUBLIC_KEY || 'public_key',
        privateKey: process.env.LIQPAY_PRIVATE_KEY || 'private_key',
        sandboxMode: process.env.LIQPAY_SANDBOX_MODE || 1,
        callbackUrl: (process.env.DOMAIN || '') + '/api/orders/liqpay-callback',
        redirectUrl: (process.env.DOMAIN || '') + '/api/orders/liqpay-redirect'
    }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./shared'),
    require('./' + process.env.NODE_ENV + '.js') || {}
);

log4js.configure({
  appenders: {
    out:{ type: 'console' },
    app:{ type: 'file', filename: 'all.log' }
  },
  categories: {
    default: { appenders: [ 'out', 'app' ], level: 'debug' }
  }
});
