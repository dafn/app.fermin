use actix_identity::Identity;
use std::fs;
use std::path::Path;

pub fn template_with_identity(auth: Identity) -> String {
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

  format!("{} {} {}", html_split[0], iwa_env, html_split[1])
}
