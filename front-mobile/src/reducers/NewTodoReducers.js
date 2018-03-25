import { NewTodoConstants } from 'actions/NewTodoActions';

const DEFAULT_NEW_TODO_STATE = {
  data_uri: null,
  processing: false,
};

export const newTodoReducer = (state = DEFAULT_NEW_TODO_STATE, action) => {
  switch (action.type) {
    case NewTodoConstants.NEW_TODO_IMAGE:
      return {
        ...state,
        data_uri: action.data_uri,
        filename: action.filename,
        filetype: action.filetype,
      };
    case NewTodoConstants.SET_PROCESSING:
      return {
        ...state,
        processing: action.processing,
      };
    case NewTodoConstants.CLEAN_NEW_TODO_FIELDS:
      return DEFAULT_NEW_TODO_STATE;
    default:
      return state;
  }
};
