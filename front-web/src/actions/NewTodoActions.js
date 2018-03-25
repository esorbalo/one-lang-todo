import keyMirror from 'keymirror';

export const NewTodoConstants = keyMirror({
  SET_PROCESSING: null,
  CLEAN_NEW_TODO_FIELDS: null,
});

export const setProcessing = processing => ({
  type: NewTodoConstants.SET_PROCESSING,
  processing,
});

export const cleanNewTodoFields = () => ({
  type: NewTodoConstants.CLEAN_NEW_TODO_FIELDS,
});
