#[macro_use]
extern crate diesel;

#[macro_use]
extern crate actix_web;

extern crate dotenv;
extern crate rustc_serialize;

mod db;
mod router;
mod utils;
mod constants;

use actix_web::{middleware, web, App, HttpServer};

use dotenv::dotenv;
use router::{api, webapp};
use utils::{get_db_url, get_port};
use constants::defaults::DEFAULT_VALUE_IP;

use std::env;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();

    let address = format!("{}:{}", DEFAULT_VALUE_IP, get_port());

    let server = HttpServer::new(|| {
        App::new()
            .data(db::init_connection(get_db_url()))
            .wrap(middleware::Compress::default())
            .wrap(middleware::Logger::new("%s | %U"))
            .service(webapp::index)
            .service(
                web::scope("/api/notes")
                    .service(api::notes::get_all)
                    .service(api::notes::get_by_id)
                    .service(api::notes::post)
                    .service(api::notes::put)
                    .service(api::notes::delete),
            )
            .service(webapp::static_files)
    })
    .bind(&address)?
    .workers(1)
    .run();

    println!("Listening at {}", &address);

    server.await
}
