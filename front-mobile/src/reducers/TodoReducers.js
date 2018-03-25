import TodoConstants from 'constants/TodoConstants';

export const receivedTodosReducer = (state = [], action) => {
  switch (action.type) {
    case TodoConstants.RECIEVED_TODOS:
      return action.todos;
    default:
      return state;
  }
};

export const searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case TodoConstants.SET_SEARCH_TEXT:
      return action.searchText;
    default:
      return state;
  }
};

export const showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case TodoConstants.TOGGLE_SHOW_COMPLETED:
      return !state;
    default:
      return state;
  }
};
