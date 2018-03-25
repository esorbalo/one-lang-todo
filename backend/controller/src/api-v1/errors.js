'use strict';

const CONSTS = {
  UNKNOWN_ERROR: 500,
  FEATURE_NOT_SUPPORTED_YET: 501,
  UNAUTHORIZED_ACCESS: 10101,
  USER_NOT_FOUND: 10201,
  USER_SIGNUP_ERROR: 10202,
  USER_SIGNIN_VALIDATION_ERROR: 10203,
  USER_SIGNUP_VALIDATION_ERROR: 10204,
  TODO_NOT_UPLOADED: 10301,
  TODO_NOT_FOUND: 10302,
};

const ERROR_MSG = {
  [CONSTS.UNKNOWN_ERROR]: 'Unknown error',
  [CONSTS.FEATURE_NOT_SUPPORTED_YET]: 'Feature is not yet supported. Stay tuned',
  [CONSTS.UNAUTHORIZED_ACCESS]: 'Not authorized to access this resource',
  [CONSTS.USER_NOT_FOUND]: 'User not found',
  [CONSTS.USER_SIGNUP_ERROR]: 'Could not signup user',
  [CONSTS.USER_SIGNIN_VALIDATION_ERROR]: 'Wrong input data',
  [CONSTS.USER_SIGNUP_VALIDATION_ERROR]: 'Wrong input data',
  [CONSTS.TODO_NOT_UPLOADED]: 'Could not upload the todo',
  [CONSTS.TODO_NOT_FOUND]: 'Todo could not be found',
};

function errorJson(errorId, err) {
  return {
    errors: [
      {
        status: errorId,
        source: { pointer: '' },
        title: ERROR_MSG[errorId],
        detail: ERROR_MSG[errorId]
      }
    ],
    forDeveloper: (err) ? (err.name + ': ' + err.message) : ''
  };

}

function UnauthorizedError(message) {
  this.name = 'UnauthorizedError';
  this.message = (message || '');
}

UnauthorizedError.prototype = Error.prototype;

module.exports = {
  consts: CONSTS,
  errorJson,
  UnauthorizedError,
};
