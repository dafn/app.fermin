use crate::db::models::cv_entries::{CVEntry, SlimCVEntry, SlimCVEntry2};
use crate::db::DBPool;

use actix_identity::Identity;
use actix_web::{error, http::StatusCode, web, Error, HttpResponse};

#[get("/")]
pub async fn get_all(db: DBPool, auth: Identity) -> Result<HttpResponse, Error> {
  //if let Some(_auth) = auth.identity() {
    return match CVEntry::get_all(&db.get().unwrap()) {
      Ok(all_cv_entries) => Ok(HttpResponse::Ok().json(&all_cv_entries)),
      Err(_) => Err(error::ErrorNotFound("Not Found")),
    };
  // }
  //Err(error::ErrorUnauthorized("Unauthorized"))
}

#[get("/{id}")]
pub async fn get_by_id(
  id: web::Path<i32>,
  db: DBPool,
  auth: Identity,
) -> Result<HttpResponse, Error> {
  //if let Some(_auth) = auth.identity() {
    return match CVEntry::get_by_id(&db.get().unwrap(), &id) {
      Ok(cv_entry) => Ok(HttpResponse::Ok().json(&cv_entry)),
      Err(_) => Err(error::ErrorNotFound("Not Found")),
    };
  //}
  //Err(error::ErrorUnauthorized("Unauthorized"))
}

#[post("/")]
pub async fn post(
  new_cv_entry: web::Json<SlimCVEntry2>,
  db: DBPool,
  auth: Identity,
) -> Result<HttpResponse, Error> {

  println!("{}", &new_cv_entry.title);
  println!("{:?}", &new_cv_entry.start_date);

  // Ok(HttpResponse::Ok().json("{}"))

  return match CVEntry::post(&db.get().unwrap(), &new_cv_entry) {
    Ok(cv_entry) => Ok(HttpResponse::Ok().json(&cv_entry)),
    Err(_) => Err(error::ErrorNotFound("Not Found")),
  };
/*
  //if let Some(_auth) = auth.identity() {
    return match CVEntry::post(&db.get().unwrap(), &new_cv_entry) {
      Ok(cv_entry) => Ok(HttpResponse::Ok().json(&cv_entry)),
      Err(_) => Err(error::ErrorNotFound("Not Found")),
    };
  //}
  //Err(error::ErrorUnauthorized("Unauthorized"))
  */
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
  //if let Some(_auth) = auth.identity() {
    return match CVEntry::delete(&db.get().unwrap(), &id) {
      Ok(_) => Ok(HttpResponse::new(StatusCode::OK)),
      Err(_) => Err(error::ErrorNotFound("Not Found")),
    };
  //}
  //Err(error::ErrorUnauthorized("Unauthorized"))
}
