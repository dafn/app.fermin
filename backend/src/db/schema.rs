table! {
    cv_entries (id) {
        id -> Int4,
        title -> Text,
        content -> Text,
        tags -> Text,
        start_date -> Timestamp,
        end_date -> Timestamp,
        created -> Timestamp,
        last_modified -> Timestamp,
    }
}

table! {
    notes (id) {
        id -> Int4,
        title -> Text,
        content -> Text,
        created -> Timestamp,
        last_modified -> Timestamp,
    }
}

table! {
    users (id) {
        id -> Int4,
        username -> Text,
        hash -> Text,
        salt -> Text,
    }
}

allow_tables_to_appear_in_same_query!(
    cv_entries,
    notes,
    users,
);
