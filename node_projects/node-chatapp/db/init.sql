DROP DATABASE chatapp;

CREATE DATABASE IF NOT EXISTS chatapp;

USE chatapp;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Chats;

CREATE TABLE Users(
  id INT AUTO_INCREMENT UNIQUE NOT NULL,
  username VARCHAR(15) UNIQUE,
  name VARCHAR(255),
  password VARCHAR(15),
  total_members INT,
  PRIMARY KEY (id)
);

CREATE TABLE Chats(
  id INT AUTO_INCREMENT NOT NULL, 
  sender_id INT,
  sender_username VARCHAR (15),
  message VARCHAR(300),
  PRIMARY KEY (id),
  FOREIGN KEY (sender_id) REFERENCES USERS(id),
  FOREIGN KEY (sender_username) REFERENCES USERS(username)
);