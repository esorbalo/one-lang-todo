'use strict';
const router = require('express').Router({mergeParams: true});

const todoService = require('../../../service').service.todo;
const config = require('../../../service').config;
const logger = require('../../../service').logger;
const errors = require('./errors.js');

//INDEX - show all user's items
router.get('/', (req, res) => {
  logger.debug('Get all todos of user:', req.params.userId);
  todoService.todos.getIndex(req.params.userId)
    .then(allItems => {
      logger.debug('allItems:');
      logger.debug(allItems);
      res.json(allItems);
    })
    .catch(err => {
      logger.warn(err);
      res.json(errors.errorJson(errors.consts.UNKNOWN_ERROR));
    });
});

router.post('/', (req, res) => {
  let uploadedItem = Object.assign({}, req.body, {});
  logger.debug('Posted item: ', uploadedItem);

  return todoService.todos.create(req.params.userId, req.body.text)
    .then(newlyCreated => {
      logger.info('Newly created item: ', newlyCreated);

      res.json(newlyCreated);
    });
});

// update
router.post('/:itemId', (req, res) => {
  let uploadedItem = Object.assign({}, req.body, {});
  logger.debug('Posted item: ', uploadedItem);
  let todo = {
    id: req.params.itemId,
    text: req.body.text,
  };

  return todoService.todos.update(todo)
    .then(updatedTodo => {
      logger.info('Updated item: ', updatedTodo);
      res.json(updatedTodo);
    });
});

// toggle
router.post('/:itemId/completed', (req, res) => {
  let uploadedItem = Object.assign({}, req.body, {});
  logger.debug('Posted item for toggle: ', uploadedItem);
  let todo = {
    id: req.params.itemId,
    completed: req.body.completed,
  };

  return todoService.todos.toggleCompleted(todo)
    .then(updatedTodo => {
      logger.info('Updated item: ', updatedTodo);
      res.json(updatedTodo);
    });
});

// Destroy item route
router.delete('/:item_id', function(req, res) {

  logger.debug('Request to delete itemId ' + req.params.todo_id);
  todoService.todos.remove(req.params.item_id)
    .then(updatedItem => {
      res.json({
        status: 'success',
      });
    })
    .catch(err => {
      logger.info(err);
      res.json(errors.errorJson(errors.consts.ITEM_NOT_FOUND));
    });
});

module.exports = router;
