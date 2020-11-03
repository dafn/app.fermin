#[macro_use]
extern crate diesel;

#[macro_use]
extern crate actix_web;

#[macro_use]
extern crate lazy_static;

extern crate actix_identity;
extern crate argonautica;
extern crate crypto;
extern crate dotenv;
extern crate rustc_serialize;

mod constants;
mod db;
mod router;
mod utils;

use actix_identity::{CookieIdentityPolicy, IdentityService};
use actix_web::{middleware, web, App, HttpServer};

use constants::defaults::DEFAULT_VALUE_IP;
use dotenv::dotenv;
use router::{api, auth, webapp};
use utils::{get_db_url, get_port};

use std::env;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();

    let address = format!("{}:{}", DEFAULT_VALUE_IP, get_port());

    let server = HttpServer::new(|| {
        App::new()
            .app_data(web::JsonConfig::default().limit(1 * 1028 * 1028))
            .data(db::init_connection(get_db_url()))
            .wrap(middleware::Compress::default())
            .wrap(IdentityService::new(
                CookieIdentityPolicy::new(&[0; 32]) // TODO: make a super secret key
                    .name("auth")
                    .max_age_time(chrono::Duration::days(30))
                    .secure(false),
            ))
            .wrap(middleware::Logger::new("%s | %r"))
            .service(webapp::index)
            .service(
                web::scope("/auth")
                    .service(auth::login)
                    .service(auth::logout),
            )
            .service(
                web::scope("/api/notes")
                    .service(api::notes::get_all)
                    .service(api::notes::get_by_id)
                    .service(api::notes::post)
                    .service(api::notes::put)
                    .service(api::notes::delete),
            )
            .service(
                web::scope("/api/cv_entries")
                    .service(api::cv_entries::get_all)
                    .service(api::cv_entries::get_by_id)
                    .service(api::cv_entries::post)
                    .service(api::cv_entries::put)
                    .service(api::cv_entries::delete),
            )
            .service(webapp::static_files)
    })
    .bind(&address)?
    .workers(1)
    .run();

    println!("Listening at {}", &address);

    server.await
}
