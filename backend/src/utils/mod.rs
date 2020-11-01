pub mod templating;
pub mod cv_struct_converter;

use std::env;

use crate::constants::defaults::{DEFAULT_VALUE_PORT, DEFAULT_VALUE_RUST_ENV};
use crate::constants::env::{DATABASE_URL_DEV, DATABASE_URL_PROD, PORT, RUST_ENV};

pub fn get_db_url() -> String {
  let env = match env::var(RUST_ENV) {
    Ok(env) => env,
    Err(_) => DEFAULT_VALUE_RUST_ENV.to_owned(),
  };

  if env == "production".to_owned() {
    env::var(DATABASE_URL_PROD).expect("Could not find 'DATABASE_URL_PROD' in env")
  } else {
    env::var(DATABASE_URL_DEV).expect("Could not find 'DATABASE_URL_DEV' in env")
  }
}

pub fn get_port() -> String {
  match env::var(PORT) {
    Ok(port) => port,
    Err(_) => DEFAULT_VALUE_PORT.to_owned(),
  }
}
