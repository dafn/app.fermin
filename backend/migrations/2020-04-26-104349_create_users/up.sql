-- Your SQL goes here
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL
    CONSTRAINT username_unique UNIQUE,
  hash TEXT NOT NULL,
  salt TEXT NOT NULL 
)
