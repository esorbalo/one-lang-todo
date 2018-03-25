'use strict';
const bcrypt = require('bcrypt');
const logger  = require('../utils/logger');

// Bookshelf postgres db ORM object. Basically it makes
// it simple and less error port to insert/query the db.
const dbBookshelf = require('../db').bookshelf;

require('./todo');
const User = dbBookshelf.model('User', {
  tableName: 'users',

  idAttribute: 'id',
  usernameAttribute: 'username',
  auth0idAttr: 'auth0id',
  firstnameAttr: 'firstname',
  lastnameAttr: 'lastname',
  middlenameAttr: 'middlename',
  pictureAttr: 'picture',
  providerAttr: 'provider',  //Auth0, Facebook, G+, etc
  auth0nicknameAttr: 'auth0nickname',
  auth0emailAttr: 'auth0email',
  auth0emailVerifiedAttr: 'auth0email_verified',
  removedAttr: 'removed',

  hasTimestamps: ['created_at', 'updated_at'],

  todos: function() {
    return this.hasMany('Todo', 'user');
  },
},{
  authenticate: function(username, password) {
    const that = this;
    return new Promise(function(resolve, reject){
      new that({username: username})
      .fetch()
      .then(function(data) {
        logger.debug('User Model: Logged in user: ' + JSON.stringify(data));
        if (data === null) {
          reject('Invalid username or password');
        } else {
          const user = data.toJSON();
          if (!bcrypt.compareSync(password, user.password)) {
            reject('Invalid password');
          } else {
            user._id = user.id;
            resolve(user);
          }
        }
      })
      .catch((err) => {
        logger.error('Error during login: ' + err);
        reject(err);
      });
    });
  },

  findUserByAuth0Id: function funcFindUserByAuth0Id(auth0id) {
    const that = this;
    return new Promise(function(resolve, reject){
      new that({ auth0id: auth0id }).fetch()
      .then(function(foundUser) {
        return resolve(foundUser);
      })
      .catch((err) => {
        logger.error('Error during findByAuth0Id: ', err);
        reject(err);
      });
    });
  },

  // ------------------------------
  // grabUserCredentials
  // ------------------------------
  // Returns a JSON list of a single user like this:
  // {
  //     username: 'sampleun',
  //     local: {
  //          username: 'sampleun'
  //          password: 'samplepw'
  //     },
  // }
  deserializeUser: function funcDeserializeUser(userId) {
    const that = this;
    return new Promise(function(resolve, reject){
      let idNum = Number(userId);
      logger.debug('User::deserializeUser: idNum: ' + idNum);
      if (isNaN(idNum)) {
        return reject('Could not find user with that ID');
      }

      new that({id: idNum})
      .fetch()
      .then(function(data) {
        if (!data) return reject('Could not find user with that ID');
        return resolve(convertRowToUserInfo(data));
      })
      .catch((err) => {
        logger.error('Error during grabUserCredentials: ', err);
        reject(err);
      });
    });
  },

  deserializeUserByAuth0Id: function funcDeserializeUserByAuth0Id(auth0id) {
    const that = this;
    return new Promise(function(resolve, reject){
      logger.debug('User::deserializeUser: auth0id: ', auth0id);
      that.findUserByAuth0Id(auth0id)
      .then(function(foundUser) {
        if (!foundUser) {
          return reject(new Error('Could not find user with ID: '
            + auth0id));
        }
        return resolve(convertRowToUserInfo(foundUser));
      })
      .catch((err) => {
        logger.error('Error during deserializeUserByAuth0Id: ', err);
        reject(err);
      });
    });
  },

  //---------------  Auth0  ------------------------------------------------

  /**
   * @param auth0user
   *          Should have properties: id, nickname
   */
  auth0serializeUser: function funcAuth0serializeUser(auth0user) {
    const that = this;
    return new Promise(function(resolve, reject){
      // Before making the account, try and fetch a username to see if
      // it already exists.
      that.findUserByAuth0Id(auth0user.auth0id)
      .then(function(foundUser) {
        if (foundUser) {
          return resolve(foundUser.toJSON());
        }
        // Make a new postgres db row of the account
        return that.create(auth0user, {method: 'insert'})
            .then(function(newUser) {
              logger.debug('Registered new user: ');
              logger.debug(newUser.toJSON());
              resolve(newUser.toJSON());
            });
      })
      .catch((err) => {
        logger.error('Error during register: ' + err);
        reject(err);
      });
    });
  },

  auth0deserializeUser: function funcAuth0deserializeUser(userId) {
    return User.deserializeUser(userId);
  },

});

function convertRowToUserInfo(data) {
  // Skeleton JSON
  const loginUser = {
    username: null,
    id: null,
    local: {
      username: null,
      password: null,
    }
  };

  // Fill in loginUser JSON
  let row = data.toJSON();
  delete row.password;
  loginUser.username  = (row.firstname || 'null');
  loginUser.id        = row.id;
  loginUser.local     = row;
  return loginUser;
}

(function testdb() {
  logger.info('Testing database:');
  User.collection()
  .fetch()
  .then(function(collection) {
    logger.info('Select all users: ' + collection.length + ' entries.');
  })
  .catch(function(err) {
    logger.error('Error during select all: ' + err);
  });
})();

module.exports = User;
