'use strict';

const auth = require('./auth');
const config = require('./config');
const logger = require('./utils/logger');
const todos = require('./todos');

module.exports = {
  api: {
    auth,
    todos,
  },
  config,
  logger,
};
