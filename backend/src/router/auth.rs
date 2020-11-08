use crate::db::models::users::{Login, SlimUser, User};
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

      let slim_user = SlimUser {
        username: &user.username,
        src: user.src.as_ref(),
      };

      Ok(HttpResponse::Ok().json(&slim_user))
    }
    Err(_) => Err(error::ErrorUnauthorized("Unauthorized")),
  }
}

#[get("/logout")]
pub async fn logout(id: Identity) -> HttpResponse {
  id.forget();
  HttpResponse::Ok().finish()
}
