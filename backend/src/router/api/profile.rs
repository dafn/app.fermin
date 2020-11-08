use crate::db::models::users::{SlimUser, User};
use crate::db::DBPool;

use actix_identity::Identity;
use actix_web::{error, web, Error, HttpResponse};

#[get("/{user}")]
pub async fn get(
  db: DBPool,
  _auth: Identity,
  username: web::Path<String>,
) -> Result<HttpResponse, Error> {
  let get_user = User::get(&db.get().unwrap(), &username);
  return match get_user {
    Ok(user) => Ok(HttpResponse::Ok().json(SlimUser {
      username: &user.username,
      src: user.src.as_ref(),
    })),
    Err(_) => Err(error::ErrorUnauthorized("Unauthorized")),
  };
}

#[put("/")]
pub async fn put(db: DBPool, auth: Identity, body: web::Bytes) -> Result<HttpResponse, Error> {
  if let Some(auth) = auth.identity() {
    return match String::from_utf8(body.to_vec()) {
      Ok(src) => match User::put(&db.get().unwrap(), &auth, Some(src)) {
        Ok(_) => Ok(HttpResponse::Ok().finish()),
        Err(_) => Err(HttpResponse::InternalServerError().into()),
      },
      Err(_) => Err(HttpResponse::BadRequest().into()),
    };
  }
  Err(error::ErrorUnauthorized("Unauthorized"))
}
