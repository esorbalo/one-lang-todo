'use strict';
const VError = require('verror');

const logger = require('../utils/logger');
const Todo = require('../models-pg/todo');

let getAllUserTodos = (userId) => {
  return Todo.getAllTodos(userId);
};

let createNewTodo = (newTodo) => {
  return new Promise((resolve, reject) => {
    logger.debug('createNewTodo: newTodo=' + JSON.stringify(newTodo));

    let insertedTodo = null;
    Todo.create(newTodo, {method: 'insert'})
    .then(function(resultTodo) {
      return resolve(resultTodo.toJSON());
    })
    .catch(function(err) {
      const verr = new VError(err, 'Error inserting todo.');
      logger.error(verr);
      reject(verr);
    });
  });
};

let findTodoById = (todoId) => {
  return new Promise((resolve, reject) => {
    logger.debug('todo findById');
    Todo.findById(todoId, {require: true})
    .then(function(foundTodo) {
      let foundTodoJson = foundTodo.toJSON();
      foundTodoJson._id = foundTodoJson.id;
      resolve(foundTodoJson);
    })
    .catch(function(err) {
      const verr = new VError(err, 'Database error.');
      logger.error(verr);
      reject(verr);
    });
  });
};

module.exports = {
  getAllUserTodos,
  createNewTodo,
  findTodoById,
};
