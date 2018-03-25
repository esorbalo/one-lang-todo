import $ from 'jquery';
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
    request
      .get(url)
      .set(authService.authHeader1(), authService.getAuthHeader2())
      .end((err, response) => {
        if (err) return reject(err);
        resolve(response.body);
      });
  }),

  getTodos: userId => new Promise((resolve, reject) => {
    const url = `${URL_PREFIX_USERS + userId}/todos`;
    request
      .get(url)
      .set(authService.authHeader1(), authService.getAuthHeader2())
      .end((err, response) => {
        if (err) return reject(response.body || err);
        resolve(response.body);
      });
  }),

  postTodo: function funcTodosApiPostTodo(userId, newTodo) {
    const url = `${URL_PREFIX_USERS + userId}/todos`;
    return $.ajax({
      url,
      type: 'POST',
      data: newTodo,
      headers: { [authService.authHeader1()]: authService.getAuthHeader2() },
      dataType: 'json',
    });
  },

  toggleCompleted: function funcTodosApiToggleCompleted(userId, todo) {
    const url = `${URL_PREFIX_USERS + userId}/todos/${todo.id}/completed`;
    return $.ajax({
      url,
      type: 'POST',
      data: todo,
      headers: { [authService.authHeader1()]: authService.getAuthHeader2() },
      dataType: 'json',
    });
  },

  deleteTodo: function funcTodosApiGetOneTodo(userId, todoId) {
    return new Promise((resolve, reject) => {
      const url = `${URL_PREFIX_USERS + userId}/todos/${todoId}`;
      request
        .delete(url)
        .set(authService.authHeader1(), authService.getAuthHeader2())
        .end((err, response) => {
          if (err) return reject(response.body || err);
          const data = response.body;
          if (data.error) return reject(data.error);
          resolve(response.body);
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
          if (err) return reject(response.body || err);
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
