use actix_files::NamedFile;
use actix_identity::Identity;
use actix_web::{HttpRequest, HttpResponse, Result};
use std::path::{Path, PathBuf};

use crate::utils::templating::template_with_identity;

#[get("/")]
pub async fn index(auth: Identity) -> HttpResponse {
	let html = template_with_identity(auth);

	HttpResponse::Ok().content_type("text/html").body(html)
}

#[get("/{filename:.*}")]
pub async fn static_files(req: HttpRequest) -> Result<NamedFile> {
	let filename: PathBuf = req.match_info().query("filename").parse().unwrap();
	let path = Path::new("../frontend/dist/").join(filename);
	Ok(NamedFile::open(path)?)
}
