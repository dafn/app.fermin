const endpoint = "auth/login";

export const login = ({ username, password }: Login): Promise<JsonWebKey> => {
  return fetch(endpoint, {
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
