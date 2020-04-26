import { h, Fragment } from "preact";

interface Props {
  path: Route;
  children: h.JSX.Element;
}

const Route = ({ children }: Props) => {
  return <Fragment> {children} </Fragment>;
};

export default Route;
