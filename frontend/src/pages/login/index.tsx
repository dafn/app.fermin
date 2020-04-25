import { h } from "preact";
import { useContext } from "preact/hooks";

import { TextField } from "preact-material-components/TextField";
import { Button } from "preact-material-components/Button";

import authContext from "src/auth/authContext";

import style from "./index.module.scss";

const Login = () => {
  const { setIsLoggedIn } = useContext(authContext);

  return (
    <main class={style.login}>
      <section>
        <TextField label="Brukernavn" outlined dense />
        <TextField label="Passord" outlined dense type="password" />
        <Button raised primary onClick={() => setIsLoggedIn(true)}>
          Log inn
        </Button>
      </section>
    </main>
  );
};

export default Login;
