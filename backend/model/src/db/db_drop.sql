-- foreign keys
ALTER TABLE todos
    DROP CONSTRAINT users_todos;

-- tables
DROP TABLE todos;

DROP TABLE users;

-- End of file.
