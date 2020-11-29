use chrono::NaiveDateTime;
use diesel;
use diesel::pg::PgConnection;
use diesel::prelude::*;
use diesel::result::*;

use crate::db::schema::notes as notes_schema;
use crate::db::schema::notes::dsl::notes;

use serde::{Deserialize, Serialize};

#[derive(Queryable, Serialize, Deserialize)]
pub struct Note {
  pub id: i32,
  pub title: String,
  pub content: String,
  pub created: NaiveDateTime,
  pub last_modified: NaiveDateTime,
}

#[derive(Insertable)]
#[table_name = "notes_schema"]
pub struct NewNote<'a> {
  pub title: &'a str,
  pub content: &'a str,
}

#[derive(Deserialize)]
pub struct SlimNote {
  pub title: String,
  pub content: String,
}

impl Note {
  pub fn get_all(connection: &PgConnection) -> Result<Vec<Note>, Error> {
    notes
      .order(notes_schema::id.asc())
      .load::<Note>(connection)
  }

  pub fn get_one<'a>(connection: &PgConnection, _id: &'a i32) -> Result<Note, Error> {
    notes.find(_id).first::<Note>(connection)
  }

  pub fn post<'a>(connection: &PgConnection, _note: &SlimNote) -> Result<Vec<Note>, Error> {
    diesel::insert_into(notes_schema::table)
      .values(&NewNote { title: &_note.title, content: &_note.content })
      .get_results(connection)
  }

  pub fn put<'a, 'b>(
    connection: &PgConnection,
    _id: &'a i32,
    _note: &'b SlimNote,
  ) -> Result<Note, Error> {
    diesel::update(notes.find(_id))
      .set((
        notes_schema::title.eq(&_note.title),
        notes_schema::content.eq(&_note.content),
        notes_schema::last_modified.eq(chrono::offset::Utc::now().naive_local()),
      ))
      .get_result::<Note>(connection)
  }

  pub fn delete<'a>(connection: &PgConnection, _id: &'a i32) -> Result<usize, Error> {
    diesel::delete(notes.find(_id)).execute(connection)
  }
}
