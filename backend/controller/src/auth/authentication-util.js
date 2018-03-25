'use strict';
const AuthenticationClient = require('auth0').AuthenticationClient;
const axios = require('axios');
const VError = require('verror');

const config = require('../../../service').config;
const logger = require('../../../service').logger;

function AuthenticationUtil(config, serializeUserFunc) {
  this.auth0 = new AuthenticationClient({
    domain: config.domain,
    clientId: config.clientID
  });
  this.serializeUserFunc = serializeUserFunc;
}

AuthenticationUtil.prototype.signupLocalDb = function(userInfo, cb) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {

      logger.debug('Request to register userInfo: ', userInfo);
      return this.serializeUserFunc(userInfo)
        .then(function(serializedUser){
          if (cb) {cb(null, serializedUser);}
          return resolve(serializedUser);
        })
        .catch(function(err){
          logger.error(new VError(err, 'Could not serialize following user: %1', userInfo));
          if (cb) {cb(err, null);}
          return reject(err);
        });

    });
  });
};

// Former getUserInfoAndSignup
AuthenticationUtil.prototype.signupBasedOnJwt = function(jwtToken, cb) {

  return new Promise((resolve, reject) => {
    process.nextTick(() => {

      logger.debug('signupBasedOnJwt: jwtToken=', jwtToken);
      return this.getUserInfoUsingJwt(jwtToken)
        .then(userInfo => {
          logger.debug('signupBasedOnJwt: userInfo=', userInfo);
          if (!userInfo) return reject('userInfo is null');
          if (cb) {return this.signupLocalDb(userInfo, cb);}
          return this.signupLocalDb(userInfo);
        })
        .then(userInfo => {
          if (cb) {return cb(null, userInfo);}  // in principle should not
          // reach this point.
          resolve(userInfo);
        })
        .catch(err => {
          if (cb) {cb(err, null);}
          reject(err);
        });
    });
  });
};

AuthenticationUtil.prototype.getUserInfoUsingJwt = function(jwtToken) {

  return this.auth0.users.getInfo(jwtToken);
};

AuthenticationUtil.prototype.signup = function(userData) {
  userData.connection = 'Username-Password-Authentication';
  userData.scope = 'openid';
  userData.grant_type = 'password';
  userData.audience = `https://${config.auth0.domain}/api/v2/`;
  logger.debug('AuthenticationUtil.prototype.signup', userData);
  // First Sign-up, the Sign-in and then we have the token to do the
  // previous register user.
  return this.auth0.database.signUp(userData);
};

function auth0SignIn(credentials) {
  let body = {
    'grant_type': 'password',
    'client_id': config.auth0.clientID,
    'client_secret': config.auth0.clientSecret,
    'audience': `https://${config.auth0.domain}/api/v2/`,
    'scope': 'openid',
  };
  body = Object.assign(body, credentials);
  logger.debug('auth0SignIn body:', body);
  return axios.post(`https://${config.auth0.domain}/oauth/token`, body);
}

AuthenticationUtil.prototype.signinAndGetToken = function AuthenticationUtilSigninAndGetToken(userData) {

  // userData.connection = 'Username-Password-Authentication';
  // userData.scope = 'openid';
  userData.username = userData.email;
  logger.debug('AuthenticationUtil.prototype.signinAndGetToken', userData);
  return auth0SignIn(userData);
};

module.exports = AuthenticationUtil;
