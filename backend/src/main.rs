#[macro_use]
extern crate actix_web;

extern crate dotenv;

mod routes;

use actix_web::{middleware, web, App, HttpServer};
use dotenv::dotenv;

use routes::webapp;

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
            .wrap(middleware::Compress::default())
            .wrap(middleware::Logger::new("%s | %U"))
            .service(
                web::scope("")
                    .service(webapp::index)
                    .service(webapp::static_files),
            )
    })
    .bind(format!("localhost:{}", port))?
    .run();

    println!("Listening to port {}", port);

    server.await
}
