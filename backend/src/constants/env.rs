pub const DATABASE_URL_DEV: &str = "DATABASE_URL_DEV";
pub const DATABASE_URL_PROD: &str = "DATABASE_URL_PROD";
pub const PORT: &str = "PORT";
pub const RUST_ENV: &str = "RUST_ENV";

/*
lazy_static! {
  static ref RUST_ENV: String =
    std::env::var("RUST_ENV").unwrap_or("development");
  static ref PORT: String =
    std::env::var("PORT").unwrap_or("8088");
  static ref ARGON2_KEY: String =
    std::env::var("ARGON2_KEY").expect("Could not find ARGON2_KEY envirtoment variable");
  static ref COOKIE_KEY: String =
    std::env::var("COOKIE_KEY").expect("Could not find COOKIE_KEY envirtoment variable");
}
*/