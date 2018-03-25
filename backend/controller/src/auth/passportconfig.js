'use strict';
const cors          = require('cors');

var config          = require('../../../model').config;
var logger          = require('../../../model').logger;
var authApi         = require('../../../model').api.auth;

module.exports = function(app) {
  app.use(cors());
};
