// We have four debbuging levels: error, warn, info, debug.
//
//     FATAL – The application is in a critical state and cannot proceed with the execution
//             of the current operation. In this case, the application usually reports such
//             message and terminates.
//             In our case we use ERROR also for FATAL cases.
//     ERROR – A serious problem occurred while processing the current operation. Such a
//             message usually requires the user to interact with the application or research
//             the problem in order to find the reason and resolve it.
//             (Tip: Exceptions are usually reported as errors because they usually have a
//             similar meaning.)
//     WARNING – Such messages are reported when something unusual happened that is not
//             critical to process the current operation (and the application in general),
//             but it would be useful to review this situation to decide if it should be
//             resolved. (Tip: This level is usually selected as active for applications in
//             production.)
//     INFO – Informative messages are usually used for reporting significant application
//             progress and stages. Informative messages should not be reported too frequently
//             because they can quickly become “noise.”
//     DEBUG – Used for debugging messages with extended information about application
//             processing. Such messages usually report calls of important functions along
//             with results they return and values of specific variables, or parameters.
//     TRACE / SILLY – This level is most informative (and usually even excessive). Trace messages
//             report most of application actions or events and are mostly used to follow
//             application logic in full detail.
//             Please do not use this level!!!

var winston = require('winston');
var config  = require('../config');

var logger = new(winston.Logger)({
  levels: winston.config.npm.levels,
  colors: winston.config.npm.colors,
  level: config.logLevel,
  transports: [
    new(winston.transports.Console)({
      json: false,
      prettyPrint: true,
      timestamp: true,
      level: config.logLevelConsole,
      colorize: true
    }),
    // new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
  ],
  exceptionHandlers: [
    new(winston.transports.Console)({
      json: false,
      // prettyPrint: true,
      humanReadableUnhandledException: true,
      timestamp: true,
      colorize: true
    }),
    // new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })
  ],
  // exitOnError: false
});

module.exports = logger;
