import { urlBuilder } from "src/api/helpers";

export const getById = ({ id }: Pick<Note, "id">): Promise<Note> => {
  return fetch(urlBuilder.notes.getById(id))
    .then((res) => res.json())
    .catch((err) =>
      console.error(`notes > getById | Could not get note with id ${id}`, err)
    );
};

export const getAll = (): Promise<Note[]> => {
  return fetch(urlBuilder.notes.getAll())
    .then((res) => res.json())
    .catch((err) =>
      console.error("notes > getAll | Could not get all notes", err)
    );
};

export const post = ({
  title,
  content,
}: Pick<Note, "title" | "content">): Promise<void | Response> => {
  return fetch(urlBuilder.notes.post(), {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
    }),
  }).catch((err) => console.error("notes > post | Could not post note", err));
};

export const put = ({
  id,
  title,
  content,
}: Pick<Note, "id" | "title" | "content">): Promise<void | Response> => {
  return fetch(urlBuilder.notes.put(id), {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
    }),
  }).catch((err) =>
    console.error(`notes > put | Could not put note with id '${id}'`, err)
  );
};

export const removeById = ({
  id,
}: Pick<Note, "id">): Promise<void | Response> => {
  return fetch(urlBuilder.notes.removeById(id), {
    method: "delete",
  }).catch((err) =>
    console.error(
      `notes > removeById | Could not remove note with id '${id}'`,
      err
    )
  );
};
