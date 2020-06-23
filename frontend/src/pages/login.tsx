import { h } from "preact";
import { useContext, useRef, useState, useEffect } from "preact/hooks";

import TextField from "src/components/core/TextField";
import Button from "src/components/core/Button";

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
    <main className={css["login"]}>
      <section>
        <TextField label="Brukernavn" ref={username} />
        <TextField label="Passord" type="password" ref={password} />
        <Button
          primary
          disabled={disabled}
          onClick={() => {
            setDisabled(true);
            login({
              username: username.current.base.children[1].value,
              password: password.current.base.children[1].value,
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

css`
  .login {
    display: grid;
    width: 100%;
    background: var(--fermin-theme-background);
    > section {
      align-self: center;
      justify-self: center;
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
      row-gap: 2rem;
      width: 24rem;
    }
  }
`;
