use diesel;
use diesel::pg::PgConnection;
use diesel::prelude::*;
use diesel::result::*;

use crate::db::schema::users as users_schema;
use crate::db::schema::users::dsl::users;

use argonautica::Hasher;
use serde::{Deserialize, Serialize};

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
    let user = users
      .filter(users_schema::username.eq(&_login.username))
      .first::<User>(connection);

    if let Ok(user) = user {
      if user.hash == get_hash(&_login.password, &user.salt) {
        return Ok(user);
      }
    }

    Err(Error::NotFound)
  }
}

lazy_static! {
  static ref ARGON2_KEY: String =
    std::env::var("ARGON2_KEY").expect("Could not find ARGON2_KEY envirtoment variable");
}

fn get_hash(value_to_hash: &str, salt: &str) -> String {
  let mut argon2_hasher = Hasher::default();
  argon2_hasher
    .configure_hash_len(16)
    .configure_memory_size(512)
    .configure_iterations(16);
  argon2_hasher
    .with_password(value_to_hash)
    .with_salt(salt)
    .with_secret_key(ARGON2_KEY.as_str())
    .hash()
    .unwrap()
}
