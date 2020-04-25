const endpoint = "/auth/";

export const logIn = ({ username, password }: Login): Promise<JsonWebKey> => {
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
    .then((res) => res.json())
    .catch((err) => console.error("Could not log in:", err));
};


export const logOut = (): Promise<number> => {
  return fetch(endpoint + "logout")
    .then((res) => res.json())
    .catch((err) => console.error("Could not log out:", err));
};