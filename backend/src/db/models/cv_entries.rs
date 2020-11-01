use chrono::NaiveDateTime;
use diesel;
use diesel::pg::PgConnection;
use diesel::prelude::*;
use diesel::result::*;

use crate::db::schema::cv_entries as cv_entries_schema;
use crate::db::schema::cv_entries::dsl::cv_entries;

use serde::{Deserialize, Serialize};

#[derive(Queryable, Serialize, Deserialize)]
pub struct CVEntry {
  pub id: i32,
  pub title: Option<String>,
  pub content: Option<String>,
  pub tags: Option<String>,
  pub src: Option<String>,
  pub start_date: Option<String>,
  pub end_date: Option<String>,
  pub created: NaiveDateTime,
  pub last_modified: NaiveDateTime,
}

#[derive(Insertable, Deserialize)]
#[table_name = "cv_entries_schema"]
pub struct SlimCVEntry {
  pub title: Option<String>,
  pub content: Option<String>,
  pub tags: Option<String>,
  pub src: Option<String>,
  pub start_date: Option<String>,
  pub end_date: Option<String>,
}

impl CVEntry {
  pub fn get_all(connection: &PgConnection) -> Result<Vec<CVEntry>, Error> {
    cv_entries
      .order(cv_entries_schema::end_date.asc())
      .load::<CVEntry>(connection)
  }

  pub fn get_by_id<'a>(connection: &PgConnection, _id: &'a i32) -> Result<CVEntry, Error> {
    cv_entries.find(_id).first::<CVEntry>(connection)
  }

  pub fn post<'a>(
    connection: &PgConnection,
    _cv_entry: &'a SlimCVEntry,
  ) -> Result<Vec<CVEntry>, Error> {
    diesel::insert_into(cv_entries_schema::table)
      .values(_cv_entry)
      .get_results(connection)
  }

  pub fn put<'a, 'b>(
    connection: &PgConnection,
    _id: &'a i32,
    _cv_entry: &'b SlimCVEntry,
  ) -> Result<CVEntry, Error> {
    diesel::update(cv_entries.find(_id))
      .set((
        cv_entries_schema::title.eq(&_cv_entry.title),
        cv_entries_schema::content.eq(&_cv_entry.content),
        cv_entries_schema::start_date.eq(&_cv_entry.start_date),
        cv_entries_schema::end_date.eq(&_cv_entry.end_date),
        cv_entries_schema::tags.eq(&_cv_entry.tags),
        cv_entries_schema::last_modified.eq(chrono::offset::Utc::now().naive_local()),
      ))
      .get_result::<CVEntry>(connection)
  }

  pub fn delete<'a>(connection: &PgConnection, _id: &'a i32) -> Result<usize, Error> {
    diesel::delete(cv_entries.find(_id)).execute(connection)
  }
}
