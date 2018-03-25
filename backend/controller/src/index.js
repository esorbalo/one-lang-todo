'use strict';

module.exports = function() {

  const express         = require('express');
  const app             = express();
  const validator       = require('express-validator');
  const bodyParser      = require('body-parser');
  const methodOverride  = require('method-override');
  const path            = require('path');

  const logger          = require('../../model').logger;
  const config          = require('../../model').config;
  const passportconfig  = require('./auth/passportconfig');
  const routesApi       = require('./api-v1');
  const errors          = require('./api-v1/errors.js');
  const expressLogger   = require('./utils').expressLogger;

  logger.info('PORT: ' + config.port);
  app.set('port', config.port);
  app.set('ip', config.ip);

  app.use(validator());
  app.use(expressLogger.logger);
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.use('/', express.static(__dirname + '/../public'));
  logger.info('Dirname: ' + __dirname);
  app.use(methodOverride('_method'));

  passportconfig(app);

  app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = '';
    res.locals.success = '';

    next();
  });

  app.use('/api/v1/', routesApi);

  // Handles all routes so you do not get a not found error
  app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  });

  // setup an error handler
  app.use(expressLogger.errorLogger);

  app.use(function(err, req, res, next) {
    logger.error(err);

    // First check if it is an authorization problem
    if (err.name === 'UnauthorizedError') {
      return res.status(403)
        .json(errors.errorJson(errors.consts.UNAUTHORIZED_ACCESS, err));
    }

    return res.status(500).json(errors.errorJson(errors.consts.UNKNOWN_ERROR, err));
  });

  app.listen(app.get('port'), function() {
    logger.info(`App server has started: http://${app.get('ip')}:${app.get('port')}`);
  });

  return app;
};
