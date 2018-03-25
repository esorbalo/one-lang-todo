import TodoConstants from 'constants/TodoConstants';
import TodosApi from 'utils/TodosApi';
import { setCommunicationError } from './SharedActions';

export const receivedTodos = todos => ({
  type: TodoConstants.RECIEVED_TODOS,
  todos,
});

export const startGetTodos = userId =>
  dispatch => TodosApi.getTodos(userId)
    .then((todos) => {
      dispatch(receivedTodos(todos));
    })
    .catch((err) => {
      console.error('Error while getting todos', err);
      dispatch(setCommunicationError(err));
    });

export const startAddTodo = (userId, newTodoText) =>
  dispatch => TodosApi.postTodo(userId, {
    text: newTodoText,
  })
    .then((todos) => {
      dispatch(startGetTodos(userId));
    })
    .catch((err) => {
      dispatch(setCommunicationError(err));
    });

export const startDeleteTodo = (userId, todoId) =>
  dispatch => TodosApi.deleteTodo(userId, todoId)
    .then(() => {
      dispatch(startGetTodos(userId));
    })
    .catch((err) => {
      dispatch(setCommunicationError(err));
    });

export const startToggleTodo = todo => (dispatch) => {
  return TodosApi.toggleCompleted(todo.userId, todo)
    .then(() => {
      dispatch(startGetTodos(todo.userId));
    })
    .catch((err) => {
      dispatch(setCommunicationError(err));
    });
};

export const setSearchText = searchText => ({
  type: TodoConstants.SET_SEARCH_TEXT,
  searchText
});

// toggleShowCompleted
export const toggleShowCompleted = () => ({
  type: TodoConstants.TOGGLE_SHOW_COMPLETED
});
