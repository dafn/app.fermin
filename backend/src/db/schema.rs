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
    notes,
    users,
);
