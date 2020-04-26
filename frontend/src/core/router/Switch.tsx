import { h, Fragment } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";

import { root, getCurrentRoute, buildHref } from "src/core/router/navigator";
import authContext from "src/auth/authContext";

interface Props {
  children: h.JSX.Element | h.JSX.Element[];
}

/**
 * The Router will render the first route that match the end of the url
 */
const Router = ({ children }: Props) => {
  const [url, setUrl] = useState<Route>(getCurrentRoute());
  const { isLoggedIn } = useContext(authContext);

  useEffect(() => {
    if (window.location.href === window.location.origin + "/")
      window.location.href = root;

    if (!isLoggedIn) window.location.href = buildHref("/login");

    window.onhashchange = () => {
      if (!isLoggedIn) window.location.href = buildHref("/login");
      setUrl(getCurrentRoute());
    };
  }, []);

  if (Array.isArray(children))
    for (let child of children)
      if (url === child.props.path) return <Fragment>{child}</Fragment>;
};

export default Router;
