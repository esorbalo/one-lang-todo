import request from 'superagent/lib/client';
import config from 'config';

import { authService } from './AuthService';

const URL_SERVER = config.urlServer;
const URL_PREFIX = `${URL_SERVER}/api/v1/`;
const URL_PREFIX_USERS = `${URL_SERVER}/api/v1/users/`;

export default {

  /**
  * We do not pass any parameter. We expect it to come from
  * the web token.
  */
  getAuthenticatedUserInfo: () => new Promise((resolve, reject) => {
    const url = `${URL_PREFIX}userinfo`;
    authService.getAuthHeader2()
      .then((authHeader2) => {
        request
          .get(url)
          .set(authService.authHeader1(), authHeader2)
          .end((err, response) => {
            if (err) return reject(err);
            resolve(response.body);
          });
      });
  }),

  getTodos: userId => new Promise((resolve, reject) => {
    const url = `${URL_PREFIX_USERS + userId}/todos`;
    authService.getAuthHeader2()
      .then((authHeader2) => {
        request
          .get(url)
          .set(authService.authHeader1(), authHeader2)
          .end((err, response) => {
            if (err) return reject(response.body || err);
            resolve(response.body);
          });
      });
  }),

  postTodo: function funcTodosApiPostTodo(userId, newTodo) {
    return new Promise((resolve, reject) => {
      const url = `${URL_PREFIX_USERS + userId}/todos`;
      authService.getAuthHeader2()
        .then((authHeader2) => {
          request
            .post(url)
            .type('json')
            .set(authService.authHeader1(), authHeader2)
            .send(newTodo)
            .end((err, response) => {
              if (err) return reject(err);
              resolve(response.body);
            });
        });
    });
  },

  toggleCompleted: function funcTodosApiToggleCompleted(userId, todo) {
    return new Promise((resolve, reject) => {
      const url = `${URL_PREFIX_USERS + userId}/todos/${todo.id}/completed`;
      authService.getAuthHeader2()
        .then((authHeader2) => {
          request
            .post(url)
            .type('json')
            .set(authService.authHeader1(), authHeader2)
            .send(todo)
            .end((err, response) => {
              if (err) return reject(err);
              resolve(response.body);
            });
        });
    });
  },

  deleteTodo: function funcTodosApiGetOneTodo(userId, todoId) {
    return new Promise((resolve, reject) => {
      const url = `${URL_PREFIX_USERS + userId}/todos/${todoId}`;
      authService.getAuthHeader2()
        .then((authHeader2) => {
          request
            .delete(url)
            .set(authService.authHeader1(), authHeader2)
            .end((err, response) => {
              if (err) return reject(response.body || err);
              const data = response.body;
              if (data.error) return reject(data.error);
              resolve(response.body);
            });
        });
    });
  },

  filterTodos: function funcTodosFilter(todos, showCompleted, searchText) {
    let filteredTodos = todos;

    // Filter by showCompleted
    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted;
    });

    // Filter by searchText
    if (searchText) {
      filteredTodos = filteredTodos.filter((todo) => {
        return (todo.text.toLowerCase().indexOf(searchText) >= 0);
      });
    }

    // Sort todos with non-completed first
    filteredTodos.sort((a, b) => {
      if (!a.completed && b.completed) {
        return -1;
      } else if (a.completed && !b.completed) {
        return 1;
      }
      return 0;
    });

    return filteredTodos;
  },

  login: function funcLogin(loginData) {
    return new Promise((resolve, reject) => {
      const url = `${URL_PREFIX}/auth/signin`;
      request
        .post(url)
        .send(loginData)
        .end((err, response) => {
          if (err) return reject(response ? response.body : err || err);
          if (response.body.error) return reject(response.body.error);
          if (response.body.errors) return reject(response.body.errors);
          resolve(response.body);
        });
    });
  },

  signup: function funcSignup(signupData) {
    return new Promise((resolve, reject) => {
      const url = `${URL_PREFIX}/auth/signup`;
      request
        .post(url)
        .send(signupData)
        .end((err, response) => {
          if (err) return reject(response.body || err);
          if (response.body.error) return reject(response.body.error);
          if (response.body.errors) return reject(response.body.errors);
          resolve(response.body);
        });
    });
  },

};
