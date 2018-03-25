import * as redux from 'redux';
import thunk from 'redux-thunk';

import { dataRetrievalReducer } from '../reducers/SharedReducers';
import { messageSuccessReducer, messageErrorReducer } from '../reducers/FlashReducers';
import {
  receivedTodosReducer,
  searchTextReducer,
  showCompletedReducer,
} from '../reducers/TodoReducers';
import { newTodoReducer } from '../reducers/NewTodoReducers';
import { loginReducer, authenticatedReducer } from '../reducers/AuthReducers';

export const configureReduxStore = (initialState) => {
  const reducer = redux.combineReducers({
    dataRetrieval: dataRetrievalReducer,
    authenticated: authenticatedReducer,
    user: loginReducer,

    messageSuccess: messageSuccessReducer,
    messageError: messageErrorReducer,

    todos: receivedTodosReducer,
    newTodo: newTodoReducer,
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
  });

  const store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
