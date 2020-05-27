CREATE DATABASE todo;

 create table user_details(
 user_id serial PRIMARY KEY,
 user_name varchar(255),
 user_email varchar(255),
 user_password varchar(255)
 );


create table todo_list(
todo_id serial PRIMARY KEY,
description varchar(255),
user_id integer references user_details(user_id)
);

