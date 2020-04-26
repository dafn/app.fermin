const endpoint = "/auth/";

export const logIn = ({
  username,
  password,
}: Login): Promise<boolean | void> => {
  return fetch(endpoint + "login", {
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

export const logOut = (): Promise<number> => {
  return fetch(endpoint + "logout")
    .then((res) => res.json())
    .catch((err) => console.error("Error logging out:", err));
};
