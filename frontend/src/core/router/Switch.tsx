import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";

import { root, getCurrentRoute } from "src/core/router/navigator";

interface Props {
  children: h.JSX.Element | h.JSX.Element[];
}

/**
 * The Router will render the first route that match the end of the url
 */
const Router = ({ children }: Props) => {
  const [url, setUrl] = useState<Route>(getCurrentRoute());

  useEffect(() => {
    if (window.location.href === window.location.origin + "/")
      window.location.href = root;

    window.onhashchange = () => {
      setUrl(getCurrentRoute());
    };
  }, []);

  if (Array.isArray(children))
    for (let child of children)
      if (url === child.props.path) return <Fragment>{child}</Fragment>;
};

export default Router;
