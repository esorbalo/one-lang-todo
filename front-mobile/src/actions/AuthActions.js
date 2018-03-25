// import { browserHistory } from 'react-router';

import AuthConstants from 'constants/AuthConstants';
import { authService } from 'utils/AuthService';
import AuthStore from 'stores/AuthStore';
import TodosApi from 'utils/TodosApi';
import { FlashConstant, addFlashMessage } from './FlashActions';
import { setCommunicationError } from './SharedActions';

export const setAuthenticated = authenticated => ({
  type: AuthConstants.SET_AUTHENTICATED,
  authenticated,
});

export const login = profile => ({
  type: AuthConstants.LOGIN_USER,
  profile,
});

export const checkInitialAuthentication = () => (dispatch) => {
  const isAuthenticated = AuthStore.isAuthenticated();
  AuthStore.getUser()
    .then((userProfile) => {
      return dispatch(login(userProfile));
    })
    .then(() => {
      dispatch(setAuthenticated(isAuthenticated));
    })
    .catch((err) => {
      console.error('Could not checkInitialAuthentication', err);
    });
};

function failedLogin() {
  console.log('failedLogin');
  // browserHistory.replace('/');
  AuthStore.removeUser();  // removes tokens
  AuthStore.emitChange();
}

function authenticationCallback(dispatch, userInfoClient) {
  return (authResult) => {
    // If login is successful, we want to dispatch
    // the logUserIn action so we can have the profile
    // and token set in local storage

    TodosApi.getAuthenticatedUserInfo()
      .then((userInfoServer) => {
        if (!userInfoServer || userInfoServer.error || userInfoServer.errors) {
          return failedLogin();
        }
        return AuthStore.setUser(userInfoServer);
      })
      .then(() => {
        AuthStore.emitChange();
        dispatch(checkInitialAuthentication());
      })
      .catch((err) => {
        console.error('Could not get userInfo:', err);
        dispatch(addFlashMessage(FlashConstant.FLASH_ERROR, 'Error while authenticating user'));
        failedLogin();
      });
  };
}

export const startSignup = loginData =>
  dispatch => TodosApi.signup(loginData)
    .then((data) => {
      authService.setToken(data.tokens.id_token);
      (authenticationCallback(dispatch))(data.tokens);
    })
    .catch((err) => {
      console.error('Could not signup:', err);
      if (err.message) {
        dispatch(setCommunicationError(err));
      } else if (err.errors && err.errors.length > 0) {
        dispatch(setCommunicationError({ message: err.errors[0].title }));
      }
    });

export const startLogin = loginData => (dispatch) => {
  console.assert(loginData != null, 'Wrong loginData format');
  console.assert(loginData.email != null, 'Wrong loginData.email format');
  console.assert(loginData.password != null, 'Wrong loginData.password format');
  let data;
  return TodosApi.login(loginData)
    .then((dataLocal) => {
      data = dataLocal;
      return authService.setToken(data.id_token);
    })
    .then(() => {
      return (authenticationCallback(dispatch))(data);
    })
    .catch((err) => {
      console.log('Could not login:', err);
      if (err.message) {
        dispatch(setCommunicationError(err));
      } else if (err.errors && err.errors.length > 0) {
        dispatch(setCommunicationError({ message: err.errors[0].title }));
      }
    });
};

export const logout = () => ({
  type: 'LOGOUT',
});

export const startLogout = () => (dispatch) => {
  // browserHistory.replace('/');
  AuthStore.removeUser();
  AuthStore.emitChange();

  dispatch(setAuthenticated(false));
  dispatch(logout());
};
