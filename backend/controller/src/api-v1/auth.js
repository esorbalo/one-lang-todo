'use strict';
const router      = require('express').Router({mergeParams: true});
const VError      = require('verror');
const util        = require('util');

const logger      = require('../../../service').logger;
const config      = require('../../../service').config;
const authApi     = require('../../../service').service.auth;
const authCheck   = require('../auth/auth-check');
const AuthenticationUtil = require('../auth/authentication-util');
const getAuthenticatedUser = require('../middleware').accessRights.getAuthenticatedUser;
const errors      = require('./errors.js');

const authUtil = new AuthenticationUtil(config.auth0, authApi.auth0serializeUser);

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

/**
* Get JWT Token from request.
*/
function getJWTToken(req)
{
  var parts = req.headers.authorization.split(' ');
  if (parts.length == 2) {
    var scheme = parts[0];
    var credentials = parts[1];
    if (/^Bearer$/i.test(scheme)) {
      return credentials;
    }
  }
  return false;
}

router.get('/signup', authCheck, (req, res) => {
  logger.info('To register user: ', req.user);

  var jwtToken = getJWTToken(req);
  logger.debug('GET /signup route: jwtToken: ', jwtToken);
  return authUtil.signupBasedOnJwt(jwtToken, (err, userInfoFromDb) => {
    if (err) {
      return res.json(errors.errorJson(errors.consts.UNKNOWN_ERROR));
    }
    logger.info(userInfoFromDb);
    return res.json(userInfoFromDb);
  });
});

router.get('/userinfo', authCheck, getAuthenticatedUser, (req, res) => {
  logger.info('Request to find auth0.sub:', req.user);
  return res.json(res.locals.user);
});

function sanitizeSignup(userData) {
  //TODO implement full sanitizer

  return {
    email: String(userData.email),
    password: String(userData.password),
    user_metadata: {
      firstname: userData.firstname || 'Default firstname',
      lastname: userData.lastname || 'Default lastname',
      middlename: userData.middlename || ''
    }
  };
}

function signup(userData) {
  return new Promise((resolve, reject) => {
    userData.connection = 'Username-Password-Authentication';
    userData.scope = 'openid';
    userData.grant_type = 'password';
    userData.audience = `https://${config.auth0.domain}/api/v2/`;
    // First Sign-up, the Sign-in and then we have the token to do the
    // previous register user.
    let localUserInfo;
    return authUtil.signup(userData)
      .then(data => {
        logger.debug('Before authUtil.signinAndGetToken.');
        return authUtil.signinAndGetToken(sanitizeSignin(userData));
      })
      .then(response => {
        // signedInUser.id_token  -- has the jwtToken
        logger.debug('Signed in user:', response.data);
        localUserInfo = response.data;
        return authUtil.signupBasedOnJwt(localUserInfo.access_token);
      })
      .then(userInfo => {
        logger.debug('Registered userInfo', userInfo);
        logger.debug('Signed in user:', localUserInfo);
        userInfo.tokens = localUserInfo;
        resolve(userInfo);
      })
      .catch(err => {
        if (err && err.response) {
          logger.error('err.response:');
          logger.error(err.response.data);
        };
        const newErr = new VError(err, 'signup: could not signup');
        logger.error(VError.fullStack(newErr));
        logger.error('Message:', err.message);
        reject(newErr);
      });
  });
}

function validateSignup(req, res, next) {
  req.checkBody('password', 'Invalid password').matches(PASSWORD_PATTERN);
  req.checkBody('email', 'Invalid email').matches(EMAIL_PATTERN);
  req.checkBody('firstname', 'Invalid firstname').isAlpha();
  req.checkBody('lastname', 'Invalid lastname').isAlpha();

  req.getValidationResult()
    .then(result => {
      if (!result.isEmpty()) {
        const errorMsg = new VError('There have been validation errors: ' + util.inspect(result.array()));
        return res.status(400).send(errors.errorJson(errors.consts.USER_SIGNUP_VALIDATION_ERROR, errorMsg));
      }
      return next();
    });
}

function sanitizeSignin(userData) {
  userData.email = String(userData.email);
  userData.password = String(userData.password);
  return userData;
}

function validateSignin(req, res, next) {
  req.checkBody('password', 'Invalid password').matches(PASSWORD_PATTERN);
  req.checkBody('email', 'Invalid email').matches(EMAIL_PATTERN);
  req.getValidationResult()
    .then(result => {
      if (!result.isEmpty()) {
        const errorMsg = new VError('There have been validation errors: ' + util.inspect(result.array()));
        return res.status(400).send(errors.errorJson(errors.consts.USER_SIGNIN_VALIDATION_ERROR, errorMsg));
      }
      return next();
    });
}

router.post('/signup', validateSignup, (req, res) => {
  logger.info('To register user: ', req.body);
  return signup(sanitizeSignup(req.body))
    .then((info) => {
      res.json(info);
    })
    .catch(err => {
      logger.error('Could not signup');
      logger.error(err);
      return res.json(errors.errorJson(errors.consts.UNKNOWN_ERROR, err));
    });
});

router.post('/signin', validateSignin, (req, res) => {
  logger.info('To sign-in user: ', req.body);
  return authUtil.signinAndGetToken(sanitizeSignin(req.body))
    .then((response) => {
      res.json({
        'access_token': response.data['access_token'],
        'id_token': response.data['id_token'],
        'token_type': response.data['token_type'],
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(err.response.status).json(errors.errorJson(errors.consts.USER_NOT_FOUND, err));
    });
});

router.get('/signout', authCheck, (req, res) => {
  return res.json(errors.errorJson(errors.consts.FEATURE_NOT_SUPPORTED_YET));
  // TODO fill-in the feature.
});

router.delete('/deleteuser', authCheck, (req, res) => {
  return res.json(errors.errorJson(errors.consts.FEATURE_NOT_SUPPORTED_YET));
  // TODO fill-in the feature.
});

module.exports = router;
