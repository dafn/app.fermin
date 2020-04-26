-- Your SQL goes here
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  hash TEXT NOT NULL,
  salt TEXT NOT NULL 
)
