'use strict';
const VError = require('verror');

const logger = require('../../../service').logger;
const authService = require('../../../service').service.auth;
const todoService = require('../../../service').service.todos;
const errors = require('../api-v1/errors');

function getAuthenticatedUser(req, res, next) {
  logger.info('Authenticated user: ', req.user);

  authService.deserializeUserByTokenSub(req.user.sub)
    .then(function(foundUser){
      logger.info('Found user:', foundUser);
      res.locals.user = foundUser;
      return next();
    })
    .catch(function(err){
      let reportError = new VError(err, 'Could not find user: ');
      logger.error(VError.fullStack(reportError));
      return res.json(errors.errorJson(errors.consts.USER_NOT_FOUND));
    });
}

function mayAccessUser(req, res, next) {
  const authUserId = '' + res.locals.user.id;
  if (req.params.userId === authUserId) {
    return next();
  }
  throw new errors.UnauthorizedError('Not authorized to access this user');
}

function mayAccessTodo(req, res, next) {
  todoService.hasUserAccessToTodo(res.locals.user.id, req.params.todo_id)
    .then((may) => {
      if (may) return next();
      return res.status(403).json(errors.errorJson(errors.consts.UNAUTHORIZED_ACCESS));
    })
    .catch((err) => {
      return res.status(403).json(errors.errorJson(errors.consts.UNAUTHORIZED_ACCESS, err));
    });
}

module.exports = {
  getAuthenticatedUser,
  mayAccessUser,
  mayAccessTodo,
};
