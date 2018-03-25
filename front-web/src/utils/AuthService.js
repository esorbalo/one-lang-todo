
class AuthService {
  setAuthenticatedCallback(callback) {
    this.authenticatedCallback = callback;
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken() && !!this.getUser();
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token');
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  setUser(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  authHeader1() {
    return 'Authorization';
  }

  getAuthHeader2() {
    return `Bearer ${this.getToken()}`;
  }
}

export const authService = new AuthService();
