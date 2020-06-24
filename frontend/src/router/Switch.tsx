import { h, Fragment } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";

import { getCurrentRoute, navigate } from "src/router/navigator";
import authContext from "src/auth/authContext";
import { RouteComponent } from "src/router/Route";

interface Props {
  children: RouteComponent | RouteComponent[];
}

/**
 * The Router will render the first route that matches the end of the url
 */
const Router = ({ children }: Props) => {
  const [url, setUrl] = useState<Route>(getCurrentRoute());
  const { isLoggedIn } = useContext(authContext);

  useEffect(() => {
    if (window.location.href === window.location.origin + "/") navigate("/");

    if (!isLoggedIn) navigate("/login");

    window.onhashchange = () => {
      const { isLoggedIn } = useContext(authContext);

      if (!isLoggedIn) navigate("/login");
      setUrl(getCurrentRoute());
    };
  }, []);

  if (Array.isArray(children)) {
    for (let child of children) {
      if (Array.isArray(child.props.match)) {
        for (let path of child.props.match)
          if (url === path) {
            return <Fragment>{child}</Fragment>;
          }
      } else if (url === child.props.match) {
        return <Fragment>{child}</Fragment>;
      }
    }
  }

  return <h1>404</h1>;
};

export default Router;
