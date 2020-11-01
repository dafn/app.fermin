import { urlBuilder } from "src/api/helpers";

export const getById = ({ id }: Pick<CV, "id">): Promise<CV | void> => {
  return fetch(urlBuilder.cv_entries.getById(id))
    .then((res) => res.json())
    .catch((err) =>
      console.error(`notes > getById | Could not get note with id ${id}`, err)
    );
};

export const getAll = (): Promise<CV[]> => {
  return fetch(urlBuilder.cv_entries.getAll())
    .then((res) => res.json())
    .catch((err) =>
      console.error("notes > getAll | Could not get all notes", err)
    );
};

export const post = (cv: CV): Promise<void | Response> => {
  return fetch(urlBuilder.cv_entries.post(), {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cv),
  }).catch((err) => console.error("notes > post | Could not post note", err));
};

export const put = (cv: CV): Promise<void | Response> => {
  return fetch(urlBuilder.cv_entries.put(cv.id), {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cv),
  }).catch((err) =>
    console.error(`notes > put | Could not put note with id '${cv.id}'`, err)
  );
};

export const removeById = ({
  id,
}: Pick<CV, "id">): Promise<void | Response> => {
  return fetch(urlBuilder.cv_entries.removeById(id), {
    method: "delete",
  }).catch((err) =>
    console.error(
      `notes > removeById | Could not remove note with id '${id}'`,
      err
    )
  );
};
