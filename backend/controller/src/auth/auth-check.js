'use strict';
const jwt = require('express-jwt');

const config = require('../../../service').config;
const logger = require('../../../service').logger;

logger.info('Auth0 client ID: ', config.auth0.clientID);

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
const authCheck = jwt({
  secret: new Buffer(config.auth0.clientSecret, 'utf8'),
  audience: config.auth0.clientID
});

module.exports = authCheck;
