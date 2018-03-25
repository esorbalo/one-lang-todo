'use strict';
const Bookshelf = require('bookshelf');
const bookshelfCascadeDelete = require('bookshelf-cascade-delete');
const bookshelfModelbase = require('bookshelf-modelbase');
const Knex = require('knex');

const config = require('../config');
const logger = require('../utils/logger');

logger.info('Connecting to: ' + config.dbConnection);
const knex = Knex({
  client: 'postgres',
  // Uncomment to enable SQL query logging in console.
  debug   : (config.logLevelConsole === 'debug')? true : null,
  connection: config.dbConnection
});

const bookshelf = Bookshelf(knex);
bookshelf.plugin('registry'); // Resolve circular dependencies with relations
bookshelf.plugin(bookshelfModelbase.pluggable);

// You need to access the `default` property since the plugin is transpilled from es6 modules syntax.
bookshelf.plugin(bookshelfCascadeDelete.default);

module.exports = bookshelf;
