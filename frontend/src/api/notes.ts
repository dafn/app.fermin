const endpoint = "/api/notes/";

export const get_by_id = ({ id }: Pick<Note, "id">): Promise<Note> => {
  return fetch(endpoint + id)
    .then((res) => res.json())
    .catch((err) => console.error("Could not get_by_id:", err));
};

export const get_all = (): Promise<Note[]> => {
  return fetch(endpoint)
    .then((res) => res.json())
    .catch((err) => console.error("Could not get_all:", err));
};

export const post = ({
  title,
  content,
}: Pick<Note, "title" | "content">): Promise<void | Response> => {
  return fetch(endpoint, {
    method: "post",
    body: JSON.stringify({
      title,
      content,
    }),
  }).catch((err) => console.error("Could not post:", err));
};

export const put = ({
  id,
  title,
  content,
}: Pick<Note, "id" | "title" | "content">): Promise<void | Response> => {
  return fetch(endpoint + id, {
    method: "put",
    body: JSON.stringify({
      title,
      content,
    }),
  }).catch((err) => console.error("Could not put:", err));
};

export const remove = ({ id }: Pick<Note, "id">): Promise<void | Response> => {
  return fetch(endpoint + id).catch((err) =>
    console.error("Could not remove:", err)
  );
};
