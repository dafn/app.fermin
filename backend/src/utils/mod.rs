use std::env;

pub fn get_db_url() -> String {
  match env::var("RUST_ENV") {
    Ok(env) => {
      if env == "production".to_owned() {
        env::var("DATABASE_URL_PROD").expect("Could not find 'DATABASE_URL_PROD' in env")
      } else {
        env::var("DATABASE_URL_DEV").expect("Could not find 'DATABASE_URL_DEV' in env")
      }
    }
    Err(_) => panic!("could not find RUST_ENV in env"),
  }
}
