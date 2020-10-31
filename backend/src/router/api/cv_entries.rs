use crate::db::models::cv_entries::{CVEntry, SlimCVEntry, WebCVEntry};
use crate::db::DBPool;

use chrono::NaiveDateTime;

use actix_identity::Identity;
use actix_web::{error, http::StatusCode, web, Error, HttpResponse};

#[get("/")]
pub async fn get_all(db: DBPool, auth: Identity) -> Result<HttpResponse, Error> {
  if let Some(_auth) = auth.identity() {
    return match CVEntry::get_all(&db.get().unwrap()) {
      Ok(all_cv_entries) => Ok(HttpResponse::Ok().json(&all_cv_entries)),
      Err(_) => Err(error::ErrorNotFound("Not Found")),
    };
  }
  Err(error::ErrorUnauthorized("Unauthorized"))
}

#[get("/{id}")]
pub async fn get_by_id(
  id: web::Path<i32>,
  db: DBPool,
  auth: Identity,
) -> Result<HttpResponse, Error> {
  if let Some(_auth) = auth.identity() {
    return match CVEntry::get_by_id(&db.get().unwrap(), &id) {
      Ok(cv_entry) => Ok(HttpResponse::Ok().json(&cv_entry)),
      Err(_) => Err(error::ErrorNotFound("Not Found")),
    };
  }
  Err(error::ErrorUnauthorized("Unauthorized"))
}

#[post("/")]
pub async fn post(
  web_cv_entry: web::Json<WebCVEntry>,
  db: DBPool,
  auth: Identity,
) -> Result<HttpResponse, Error> {
  if let Some(_auth) = auth.identity() {
    let new_cv_entry = SlimCVEntry {
      title: String::from(&web_cv_entry.title),
      content: String::from(&web_cv_entry.content),
      tags: String::from(&web_cv_entry.tags),
      src: String::from(&web_cv_entry.src),
      start_date: match &web_cv_entry.start_date {
        Some(string) => match NaiveDateTime::parse_from_str(&string, "%Y-%m-%d %H:%M:%S") {
          Ok(date) => Some(date),
          Err(_) => None,
        },
        None => None,
      },
      end_date: match &web_cv_entry.end_date {
        Some(string) => match NaiveDateTime::parse_from_str(&string, "%Y-%m-%d %H:%M:%S") {
          Ok(date) => Some(date),
          Err(_) => None,
        },
        None => None,
      },
    };

    return match CVEntry::post(&db.get().unwrap(), &new_cv_entry) {
      Ok(cv_entry) => Ok(HttpResponse::Ok().json(&cv_entry)),
      Err(_) => Err(error::ErrorNotFound("Not Found")),
    };
  }

  Err(error::ErrorUnauthorized("Unauthorized"))
}

#[put("/{id}")]
pub async fn put(
  id: web::Path<i32>,
  updated_cv_entry: web::Json<SlimCVEntry>,
  db: DBPool,
  auth: Identity,
) -> Result<HttpResponse, Error> {
  //if let Some(_auth) = auth.identity() {
  return match CVEntry::put(&db.get().unwrap(), &id, &updated_cv_entry) {
    Ok(_) => Ok(HttpResponse::new(StatusCode::OK)),
    Err(_) => Err(error::ErrorNotFound("Not Found")),
  };
  //}
  //Err(error::ErrorUnauthorized("Unauthorized"))
}

#[delete("/{id}")]
pub async fn delete(id: web::Path<i32>, db: DBPool, auth: Identity) -> Result<HttpResponse, Error> {
  if let Some(_auth) = auth.identity() {
    return match CVEntry::delete(&db.get().unwrap(), &id) {
      Ok(_) => Ok(HttpResponse::new(StatusCode::OK)),
      Err(_) => Err(error::ErrorNotFound("Not Found")),
    };
  }
  Err(error::ErrorUnauthorized("Unauthorized"))
}
