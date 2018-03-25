'use strict';
const dbUtils = require('./db/utils');
const logger = require('./utils/logger');
const mappers = require('./models-pg/mapper');
const Todo = require('./models-pg/todo');

const getIndex = (userId) => {
  return dbUtils.getAllUserTodos(userId);
};

const create = (userId, text) => {
  return new Promise((resolve, reject) => {
    var newTodo = {
      text: text,
      user: userId
    };

    dbUtils.createNewTodo(newTodo)
      .then(newlyCreated => {resolve(newlyCreated);})
      .catch(err => {reject(err);});
  });
};

function reportDbError(reject, msg) {
  return function(err){
    logger.error(msg + ': ' + err);
    reject(err);
  };
}

const update = (todo) => {
  return new Promise((resolve, reject) => {
    Todo.update({text: todo.text}, {id: todo.id})
      .then(function(updatedTodo){
        resolve(mappers.mapFromTodoDb(updatedTodo.toJSON()));
      })
      .catch(reportDbError(reject, 'Database error while Todo.update'));
  });
};

const toggleCompleted = (todo) => {
  return new Promise((resolve, reject) => {

    logger.debug('toggleCompleted: completed=', todo.completed, typeof todo.completed);
    let completed = undefined;
    if (todo.completed === true || todo.completed === 'true') {
      completed = 1;
    } else if (todo.completed === false || todo.completed === 'false') {
      completed = 0;
    }

    let completTodo = {completed};
    logger.debug('Todo to complete', completTodo);

    Todo.update(completTodo, {id: todo.id})
      .then(function(updatedTodo){
        resolve(mappers.mapFromTodoDb(updatedTodo.toJSON()));
      })
      .catch(reportDbError(reject, 'Database error while Todo.update'));
  });
};

const remove = (todoId) => {
  return new Promise((resolve, reject) => {
    Todo.findById(todoId)
      .then(function(foundTodo){
        logger.debug('Found todo to delete: ' + foundTodo.id);
        foundTodo.destroy()
          .then(function(){
            resolve();
          })
          .catch(reportDbError(reject, 'Database error while Todo.remove2'));
      })
      .catch(reportDbError(reject, 'Database error while Todo.remove'));
  });
};

function hasUserAccessToTodo(userId, todoId) {
  return Todo.doesTodoBelongToUser(userId, todoId);
}

module.exports = {
  getIndex,
  create,
  update,
  toggleCompleted,
  remove,
  hasUserAccessToTodo,
};
