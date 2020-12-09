-- Your SQL goes here-- Your SQL goes here
ALTER TABLE cv_entries
ADD COLUMN summary TEXT DEFAULT NULL,
ADD COLUMN category TEXT DEFAULT NULL;