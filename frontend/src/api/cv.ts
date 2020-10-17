import { urlBuilder } from "src/api/helpers";

const cvs: CV[] = [
  {
    id: 0,
    title: "Telia",
    content: "Telia er et telekomselskap som oppererer i hhele norden",
    start_date: null,
    end_date: null,
    tags: "",
    src: "",
  },
  {
    id: 1,
    title: "Buypass",
    content: "Buypass er nordens største TLS utgiver og har kontorer i 4 land",
    start_date: null,
    end_date: null,
    tags: "",
    src: "",
  },
];

export const getById = ({ id }: Pick<CV, "id">): Promise<CV | void> => {
  return new Promise((resolve, reject) => {
    if (id < cvs.length) resolve(cvs[id]);
    else reject();
  });
  /*
  return fetch(urlBuilder.notes.getById(id))
    .then((res) => res.json())
    .catch((err) =>
      console.error(`notes > getById | Could not get note with id ${id}`, err)
    );
  */
};

export const getAll = (): Promise<CV[]> => {
  return new Promise((resolve) => {
    return resolve(cvs);
  });
  /*
  return fetch(urlBuilder.notes.getAll())
    .then((res) => res.json())
    .catch((err) =>
      console.error("notes > getAll | Could not get all notes", err)
    );
  */
};

export const post = (cv: CV): Promise<CV> => {
  return new Promise((resolve) => {

    cv.id = cvs.length;

    cvs.push(cv);
    return resolve(cv);
  });

  /*
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
  */
};

export const put = (cv: CV): Promise<CV> => {
  return new Promise((resolve, reject) => {
    if (cv.id > cvs.length) reject();

    cvs[cv.id] = cv;
    return resolve(cvs[cv.id]);
  });

  /*
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
  */
};

export const removeById = ({
  id,
}: Pick<CV, "id">): Promise<void | Response> => {
  return new Promise((resolve, reject) => {
    cvs.splice(id, 1);
    return resolve();
  });
  /*
  return fetch(urlBuilder.notes.removeById(id), {
    method: "delete",
  }).catch((err) =>
    console.error(
      `notes > removeById | Could not remove note with id '${id}'`,
      err
    )
  );
  */
};
