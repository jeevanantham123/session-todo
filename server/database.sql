CREATE DATABASE perntodo;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);



CREATE TABLE todo_list(
 todo_id SERIAL PRIMARY KEY,
description VARCHAR(255),
 user_name VARCHAR(255)
 );


 CREATE TABLE todo_user(
 curr_user VARCHAR(255)
 );