import { urlBuilder } from "src/api/helpers";

export const getOne = ({ id }: Pick<CV, "id">): Promise<CV | void> => {
  return fetch(urlBuilder.cv_entries.getOne(id))
    .then((res) => res.json())
    .catch((err) =>
      console.error(`cv > getOne | Could not get note with id ${id}`, err)
    );
};

export const getAll = (): Promise<CV[]> => {
  return fetch(urlBuilder.cv_entries.getAll())
    .then((res) => res.json())
    .catch((err) =>
      console.error("cv > getAll | Could not get all notes", err)
    );
};

export const post = (cv: CV): Promise<void | Response> => {
  return fetch(urlBuilder.cv_entries.post(), {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cv),
  }).catch((err) => console.error("cv > post | Could not post note", err));
};

export const put = (cv: CV): Promise<void | Response> => {
  return fetch(urlBuilder.cv_entries.put(cv.id), {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cv),
  }).catch((err) =>
    console.error(`cv > put | Could not put note with id '${cv.id}'`, err)
  );
};

export const removeById = ({
  id,
}: Pick<CV, "id">): Promise<void | Response> => {
  return fetch(urlBuilder.cv_entries.removeById(id), {
    method: "delete",
  }).catch((err) =>
    console.error(
      `cv > removeById | Could not remove note with id '${id}'`,
      err
    )
  );
};
