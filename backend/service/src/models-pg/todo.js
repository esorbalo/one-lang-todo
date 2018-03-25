'use strict';
const logger  = require('../utils/logger');
const dbBookshelf = require('../db').bookshelf;

const mappers = require('./mapper');

require('./user');
const Todo = dbBookshelf.model('Todo', {
  tableName: 'todos',
  idAttribute: 'id',
  hasTimestamps: ['created_at', 'updated_at'],

  user: function() {
    return this.belongsTo('User', 'user');
  },
  destroy: function() {
    // The operation is done by first cascading into
    // all dependent tables, as specified by the 'dependents'
    // attribute.
    logger.debug('Someone wants to destroy the todo: ' + this.id);

    return dbBookshelf.Model.prototype.destroy.apply(this, arguments);
  }
},{
  dependents: [],
  getAllTodos: function(userId) {
    return new Promise((resolve, reject) => {
      Todo.collection()
        .query('where', 'user', '=', userId)
        .fetch({})
        .then(function(result) {
          if (result) {
            let jsonResult = result.toJSON().map(mappers.mapFromTodoDb);
            resolve(jsonResult);
          } else {
            resolve([]);
          }
        })
        .catch(function(err) {
          reject(err);
        });
  	});
  },
  findTodoById: function(todoId) {
    return Todo
      .where({id: todoId})
      .fetch({
        require: true,
      });
  },
  doesTodoBelongToUser: function funcDoesTodoBelongToUser(userId, todoId) {
    return new Promise((resolve, reject) => {
      return Todo
        .where({
          id: todoId,
          user: userId,
        })
        .fetch({
          require: false,
        })
        .then(function(result) {
          if (result) {
            return resolve(true);
          }
          return resolve(false);
        })
        .catch(function(err) {
          logger.error(err);
          reject(false);
        });
    });
  },
});


(function testdb() {
  logger.info('Testing database for todos:');
  Todo.collection()
    .fetch()
    .then(function(collection) {
      logger.info('Select all todos: ' + collection.length + ' entries.');
    })
    .catch(function(err) {
      logger.error('Error during select all todos: ' + err);
    });
})();

module.exports = Todo;
