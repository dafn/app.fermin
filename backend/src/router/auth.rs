use crate::db::models::users::{Login, User};
use crate::db::DBPool;

use actix_identity::Identity;
use actix_web::{error, web, Error, HttpResponse};

#[post("/login")]
pub async fn login(
  db: DBPool,
  id: Identity,
  login: web::Json<Login>,
) -> Result<HttpResponse, Error> {
  match User::validate(&db.get().unwrap(), &login) {
    Ok(user) => {
      id.remember(user.username.to_string());
      Ok(HttpResponse::Ok().json(&user))
    }
    Err(_) => Err(error::ErrorUnauthorized("Unauthorized")),
  }
}

#[get("/logout")]
pub async fn logout(id: Identity) -> HttpResponse {
  id.forget(); // <- remove identity
  HttpResponse::Ok().finish()
}
