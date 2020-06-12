import { h } from "preact";
import { useContext, useRef, useState, useEffect } from "preact/hooks";

import { TextField } from "preact-material-components/TextField";
import { Button } from "preact-material-components/Button";

import authContext from "src/auth/authContext";

import { login, logout } from "src/api/auth";
import { getCurrentRoute, navigate } from "src/router/navigator";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const [disabled, setDisabled] = useState(false);

  let username = useRef(null);
  let password = useRef(null);

  useEffect(() => {
    if (getCurrentRoute() === "/logout") {
      if (isLoggedIn) {
        logout().then(() => {
          setIsLoggedIn(false);
        });
      } else {
        navigate("/login");
      }
    } else if (getCurrentRoute() === "/login") {
      if (isLoggedIn) {
        navigate("/");
      }
    }
  });

  return (
    <main class={style["login"]}>
      <section>
        <TextField label="Brukernavn" outlined dense ref={username} />
        <TextField
          label="Passord"
          outlined
          dense
          type="password"
          ref={password}
        />
        <Button
          raised
          primary
          disabled={disabled}
          onClick={() => {
            setDisabled(true);
            login({
              username: username.current["MDComponent"].value,
              password: password.current["MDComponent"].value,
            }).then((isLoggedIn) => {
              isLoggedIn && setIsLoggedIn(isLoggedIn);
              setDisabled(false);
              navigate("/");
            });
          }}
        >
          Log inn
        </Button>
      </section>
    </main>
  );
};

export default Login;

const style = `
  .login {
    display: grid;
    width: 100%;
    > section {
      align-self: center;
      justify-self: center;
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
      row-gap: 2rem;
      width: 24rem;
    }
  }
`