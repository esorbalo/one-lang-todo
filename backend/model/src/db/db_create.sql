-- drop database if exists one_lang_todo;
-- create database one_lang_todo;
-- \connect one_lang_todo;

-- tables
-- Table: todos
CREATE TABLE "todos" (
    "id" serial  NOT NULL,
    "created_at" timestamp  NOT NULL DEFAULT current_timestamp,
    "updated_at" timestamp  NOT NULL DEFAULT current_timestamp,
    "text" varchar  NULL,
    "user" int  NOT NULL,
    "completed" smallint  NOT NULL DEFAULT 0,
    CONSTRAINT "todos_pk" PRIMARY KEY (id)
);

-- Table: users
CREATE TABLE "users" (
    "id" serial  NOT NULL,
    "username" varchar(100)  NOT NULL,
    "created_at" timestamp  NULL DEFAULT current_timestamp,
    "updated_at" timestamp  NULL DEFAULT current_timestamp,
    "auth0id" varchar(50)  NULL,
    "firstname" varchar(50)  NULL,
    "lastname" varchar(50)  NULL,
    "middlename" varchar(50)  NULL,
    "picture" varchar(5000)  NULL,
    "provider" varchar(50)  NULL,
    "auth0nickname" varchar(50)  NULL,
    "auth0email" varchar(50)  NULL,
    "auth0email_verified" smallint  NOT NULL DEFAULT 0,
    "removed" smallint  NOT NULL DEFAULT 0,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: users_todos (table: todos)
ALTER TABLE "todos" ADD CONSTRAINT "users_todos"
    FOREIGN KEY ("user")
    REFERENCES "users" (id)
    ON DELETE  CASCADE
    ON UPDATE  CASCADE
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- End of file.
