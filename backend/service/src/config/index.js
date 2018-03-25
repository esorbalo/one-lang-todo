'use strict';

module.exports = {
  ip: process.env.IP || '0.0.0.0',
  port: process.env.PORT || '3000',
  dbConnection: process.env.DATABASE_URL || '',
  logLevel: process.env.LOGLEVEL || 'debug',
  logLevelConsole: process.env.LOGLEVELCONSOLE || 'info',
  auth0: {
    domain: process.env.AUTH0_DOMAIN || '',
    clientID: process.env.AUTH0_CLIENT_ID || '',
    clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
    callbackURL: process.env.AUTH0_CALLBACK_URL || '',
    logoutURL: process.env.AUTH0_LOGOUT_URL || '',
    logoutReturn: process.env.AUTH0_LOGOUT_RETURN || '',
  },
  jwtSecret: process.env.JWT_SECRET || 'H13r lies !0 rea11y geat sucrut.',
};
