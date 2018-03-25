'use strict';

const mapFromTodoDb = (todoDb) => {
  return {
    id: todoDb['id'],
    createdAt: todoDb['created_at'],
    updatedAt: todoDb['updated_at'],
    text: todoDb['text'],
    completed: todoDb['completed'],
  };
};

module.exports = {
  mapFromTodoDb,
};
