table! {
    cv_entries (id) {
        id -> Int4,
        title -> Nullable<Text>,
        content -> Nullable<Text>,
        tags -> Nullable<Text>,
        src -> Nullable<Text>,
        start_date -> Nullable<Text>,
        end_date -> Nullable<Text>,
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
