import EventEmitter from 'EventEmitter';

import { authService } from 'utils/AuthService';

const CHANGE_EVENT = 'change';

class AuthStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  isAuthenticated() {
    return authService.loggedIn();
  }

  getJwt() {
    return authService.getToken();
  }

  getUser() {
    return authService.getUser();
  }

  async setUser(profile) {
    await authService.setUser(profile);
  }

  removeUser() {
    authService.logout();
  }
}

const AuthStore = new AuthStoreClass();

export default AuthStore;
