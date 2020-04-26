import { h } from "preact";
import { useContext, useRef, useState } from "preact/hooks";

import { TextField } from "preact-material-components/TextField";
import { Button } from "preact-material-components/Button";

import authContext from "src/auth/authContext";

import style from "./index.module.scss";
import { logIn } from "src/api/auth";

const Login = () => {
  const { setIsLoggedIn } = useContext(authContext);
  const [disabled, setDisabled] = useState(false);

  let username = useRef(null);
  let password = useRef(null);

  return (
    <main class={style.login}>
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
            logIn({
              username: username.current["MDComponent"].value,
              password: password.current["MDComponent"].value,
            }).then((isLoggedIn) => {
              isLoggedIn && setIsLoggedIn(isLoggedIn);
              setDisabled(false);
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
