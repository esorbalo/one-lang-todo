'use strict';
var logger      = require('./utils/logger');
var User        = require('./models-pg/user');

/**
 * Creates our User entity based on the information provided by Auth0
 * during serialization.
 */
function extractUserFromAuth0User(auth0user) {
  logger.debug('Auth0 user: ', auth0user);

  let userObj = {
    [User.prototype.auth0idAttr]: auth0user.user_id,
    [User.prototype.providerAttr]: 'auth0',  //TODO change: part of list of identities
    [User.prototype.pictureAttr]: auth0user.picture,
    [User.prototype.auth0nicknameAttr]: auth0user.nickname,
    [User.prototype.usernameAttribute]: auth0user.nickname,
    [User.prototype.auth0emailAttr]: auth0user.email,
    [User.prototype.auth0emailVerifiedAttr]: (auth0user.email_verified)? 1 : 0
  };

  if (auth0user.user_metadata) {
    userObj[User.prototype.firstnameAttr] = auth0user.user_metadata.firstname;
    userObj[User.prototype.lastnameAttr] = auth0user.user_metadata.lastname;
    userObj[User.prototype.middlenameAttr] = auth0user.user_metadata.middlename;

    // Determine the display name
    let displayName = '';
    if (auth0user.user_metadata.firstname) {
      userObj[User.prototype.firstnameAttr] = auth0user.user_metadata.firstname;
      displayName += auth0user.user_metadata.firstname;
    }
    if (auth0user.user_metadata.middlename) {
      userObj[User.prototype.middlenameAttr] = auth0user.user_metadata.middlename;
      displayName += ' ' + auth0user.user_metadata.middlename;
    }
    if (auth0user.user_metadata.lastname) {
      userObj[User.prototype.lastnameAttr] = auth0user.user_metadata.lastname;
      displayName += ' ' + auth0user.user_metadata.lastname;
    }
    userObj[User.prototype.usernameAttribute] = (displayName)? displayName : auth0user.nickname;
  }
  logger.debug('The result user to be persisted: ');
  logger.debug(userObj);
  logger.debug('-------------------------------------');
  return userObj;
}

function auth0serializeUser(auth0user) {
  return User.auth0serializeUser(extractUserFromAuth0User(auth0user));
}

function auth0deserializeUser(userId) {
  logger.debug('auth.js::auth0deserializeUser() userId:');
  logger.debug(userId);
  return User.auth0deserializeUser(userId);
}

function deserializeUserByTokenSub(tokenSub) {
  logger.debug('auth.js::deserializeUserByTokenSub() tokenSub:');
  return User.deserializeUserByAuth0Id(tokenSub);
}

module.exports = {
  auth0serializeUser,
  auth0deserializeUser,
  deserializeUserByTokenSub
};
