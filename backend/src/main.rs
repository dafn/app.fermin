#[macro_use]
extern crate diesel;

#[macro_use]
extern crate actix_web;

extern crate dotenv;
extern crate rustc_serialize;

mod db;
mod router;
mod utils;

use actix_web::{middleware, web, App, HttpServer};

use dotenv::dotenv;
use router::{api, webapp};

use std::env;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();

    let port: String = match env::var("PORT") {
        Ok(port) => port,
        Err(_) => "8088".to_owned(),
    };

    let server = HttpServer::new(|| {
        App::new()
            .data(db::init_connection(utils::get_db_url()))
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
    .bind(format!("localhost:{}", port))?
    .workers(1)
    .run();

    println!("Listening to port {}", port);

    server.await
}
