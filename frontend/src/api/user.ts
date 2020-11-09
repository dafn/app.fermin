import { urlBuilder } from "src/api/helpers";

export const getOne = ({
  username,
}: Pick<User, "username">): Promise<User | null> => {
  return fetch(urlBuilder.user.getOne(username))
    .then((res) => res.json())
    .catch((err) =>
      console.error(
        `user > getOne | Could not get note with id ${username}`,
        err
      )
    );
};

export const put = ({ src }: Pick<User, "src">): Promise<void | Response> => {
  return fetch(urlBuilder.user.put(), {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: src,
  }).catch((err) =>
    console.error(
      `user > put | Could not put user`,
      err
    )
  );
};
