import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";

import { root } from "src/core/router/navigator";

interface Props {
  children: h.JSX.Element | h.JSX.Element[];
}

/**
 * The Router will render the first route that match the end of the url
 */
const Router = ({ children }: Props) => {
  const [url, setUrl] = useState(window.location.href);

  useEffect(() => {
    if (window.location.href === window.location.origin + "/")
      window.location.href = root;

    window.onhashchange = () => {
      if (window.location.href.endsWith("#")) setUrl("/");
      else setUrl(window.location.href);
    };
  }, []);

  if (Array.isArray(children))
    for (let child of children)
      if (url.endsWith(child.props.path)) return <Fragment>{child}</Fragment>;
};

export default Router;
