use crate::db::models::users::{Login, User};
use crate::db::DBPool;

use actix_web::{error, web, Error, HttpResponse};

#[post("/login")]
pub async fn login(db: DBPool, login: web::Json<Login>) -> Result<HttpResponse, Error> {
  match User::validate(&db.get().unwrap(), &login) {
    Ok(user) => Ok(HttpResponse::Ok().json(&user)),
    Err(_) => Err(error::ErrorUnauthorized("Unauthorized")),
  }
}
