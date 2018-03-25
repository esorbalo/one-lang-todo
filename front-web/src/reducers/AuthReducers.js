import AuthConstants from 'constants/AuthConstants';

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case AuthConstants.LOGIN_USER:
      return {
        ...action.profile,
      };
    case AuthConstants.LOGOUT_USER:
      return {};
    default:
      return state;
  }
};

export const authenticatedReducer = (state = false, action) => {
  switch (action.type) {
    case AuthConstants.SET_AUTHENTICATED:
      return action.authenticated;
    default:
      return state;
  }
};
