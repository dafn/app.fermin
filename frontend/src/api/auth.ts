import { urlBuilder } from "./helpers";

export const login = ({
  username,
  password,
}: Login): Promise<boolean | void> => {
  return fetch(urlBuilder.auth.login(), {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.ok)
    .catch((err) => console.error("Error logging in:", err));
};

export const logout = (): Promise<boolean> => {
  return fetch(urlBuilder.auth.logout()).then((res) => res.ok);
};
