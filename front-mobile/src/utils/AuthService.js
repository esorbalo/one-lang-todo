import { AsyncStorage } from 'react-native';

import config from 'config';

class AuthService {
  setAuthenticatedCallback(callback) {
    this.authenticatedCallback = callback;
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken() && !!this.getUser();
  }

  async setToken(idToken) {
    // Saves user token to local storage
    // localStorage.setItem('id_token', idToken);
    await AsyncStorage.setItem('@OneLangTodo:id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from local storage
    // return localStorage.getItem('id_token');
    return AsyncStorage.getItem('@OneLangTodo:id_token');
  }

  async logout() {
    // Clear user token and profile data from local storage
    await AsyncStorage.removeItem('@OneLangTodo:id_token');
    await AsyncStorage.removeItem('@OneLangTodo:profile');
  }

  async getUser() {
    let profile = await AsyncStorage.getItem('@OneLangTodo:profile');
    return JSON.parse(profile);
  }

  async setUser(profile) {
    await AsyncStorage.setItem('@OneLangTodo:profile', JSON.stringify(profile));
  }

  authHeader1() {
    return 'Authorization';
  }

  async getAuthHeader2() {
    let token = await this.getToken();
    return `Bearer ${token}`;
  }
}

export const authService = new AuthService();
