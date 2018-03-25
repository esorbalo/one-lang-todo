'use strict';
var logger      = require('./utils/logger');
var User        = require('./models-pg/user');

// ---------------------------------
// Another example (with meta_data):
// { email_verified: false,
//   email: 'posta.reduceri+6@gmail.com',
//   clientID: 'vJMma8pJ92NFYnt9VgUgdrZHLHhncmR3',
//   user_metadata: { firstname: 'Some', lastname: 'Thing', middlename: '' },
//   updated_at: '2016-12-29T10:55:52.937Z',
//   name: 'posta.reduceri+6@gmail.com',
//   picture: 'https://s.gravatar.com/avatar/41735af7556b68c2ba844d96d694264f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpo.png',
//   user_id: 'auth0|58644c658667e7378feba812',
//   nickname: 'posta.reduceri+6',
//   identities:
//    [ { user_id: '58644c658667e7378feba812',
//        provider: 'auth0',
//        connection: 'Username-Password-Authentication',
//        isSocial: false } ],
//   created_at: '2016-12-28T23:36:05.790Z',
//   global_client_id: 'bDZZW5GcXOtCRL9W9WB7kxn0QyahFUCu' }
// ---------------------------------

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
