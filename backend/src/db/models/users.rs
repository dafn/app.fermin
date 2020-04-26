use diesel;
use diesel::pg::PgConnection;
use diesel::prelude::*;
use diesel::result::*;

use crate::db::schema::users as users_schema;
use crate::db::schema::users::dsl::users;

use serde::{Deserialize, Serialize};

use crypto::digest::Digest;
use crypto::sha2::Sha256;

#[derive(Queryable, Serialize, Deserialize)]
pub struct User {
  pub id: i32,
  pub username: String,
  pub hash: String,
  pub salt: String,
}

#[derive(Serialize, Deserialize)]
pub struct Login {
  pub username: String,
  pub password: String,
}

impl User {
  pub fn validate<'a>(connection: &PgConnection, _login: &'a Login) -> Result<User, Error> {
    let mut hasher = Sha256::new();
    hasher.input_str(&_login.password);

    let password_hash = hasher.result_str();

    users
      .filter(users_schema::username.eq(&_login.username))
      .filter(users_schema::hash.eq(&password_hash))
      .first::<User>(connection)
  }
}
