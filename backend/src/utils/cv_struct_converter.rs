use chrono::NaiveDateTime;

use crate::db::models::cv_entries::{SlimCVEntry, WebCVEntry};

pub fn web_to_slim(web_cv_entry: &WebCVEntry) -> SlimCVEntry {
  SlimCVEntry {
    title: String::from(&web_cv_entry.title),
    content: String::from(&web_cv_entry.content),
    tags: String::from(&web_cv_entry.tags),
    src: String::from(&web_cv_entry.src),
    start_date: match &web_cv_entry.start_date {
      Some(string) => match NaiveDateTime::parse_from_str(&string, "%Y-%m-%d %H:%M:%S") {
        Ok(date) => Some(date),
        Err(_) => None,
      },
      None => None,
    },
    end_date: match &web_cv_entry.end_date {
      Some(string) => match NaiveDateTime::parse_from_str(&string, "%Y-%m-%d %H:%M:%S") {
        Ok(date) => Some(date),
        Err(_) => None,
      },
      None => None,
    },
  }
}
