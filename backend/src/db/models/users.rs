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

#[derive(Deserialize)]
pub struct Login {
  pub username: String,
  pub password: String,
}

impl User {
  pub fn validate<'a>(connection: &PgConnection, _login: &'a Login) -> Result<User, Error> {
    users
      .filter(users_schema::username.eq(&_login.username))
      .filter(users_schema::hash.eq(&get_hash(&_login.password)))
      .first::<User>(connection)
  }
}

fn get_hash(value_to_hash: &str) -> String {
  let mut hasher = Sha256::new();
  hasher.input_str(value_to_hash);

  hasher.result_str()
}
