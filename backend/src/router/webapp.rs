use actix_files::NamedFile;
use actix_identity::Identity;
use actix_web::{HttpRequest, HttpResponse, Result};
use std::fs;
use std::path::{Path, PathBuf};

#[get("/")]
pub async fn index(auth: Identity) -> HttpResponse {
	let authenticated = if let Some(_auth) = auth.identity() {
		"true"
	} else {
		"false"
	};

	let iwa_env = format!(
		"<script id=\"iwa\">
	const iwa_env = {{
		isLoggedIn: {}
	}}",
		authenticated
	);

	let html = fs::read_to_string(Path::new("../frontend/dist/").join("index.html")).unwrap();
	let html_split = html.split("<script id=\"iwa\">").collect::<Vec<&str>>();

	let html_with_iwa_config = format!("{} {} {}", html_split[0], iwa_env, html_split[1]);
	HttpResponse::Ok()
		.content_type("text/html")
		.body(html_with_iwa_config)
}

#[get("/{filename:.*}")]
pub async fn static_files(req: HttpRequest) -> Result<NamedFile> {
	let filename: PathBuf = req.match_info().query("filename").parse().unwrap();
	let path = Path::new("../frontend/dist/").join(filename);
	Ok(NamedFile::open(path)?)
}
