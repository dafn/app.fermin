import { h } from "preact";

import style from "./index.module.scss";
import { TextField } from "preact-material-components/TextField";
import { Button } from "preact-material-components/Button";

const Login = () => {
  return (
    <main class={style.login}>
      <section>
        <TextField label="Brukernavn" outlined dense />
        <TextField label="Passord" outlined dense type="password" />
        <Button raised primary> Log inn </Button>
      </section>
    </main>
  );
};

export default Login;
