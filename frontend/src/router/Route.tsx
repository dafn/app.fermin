import { h, Fragment } from "preact";

interface Props {
  match: Route | Route[];
  children: h.JSX.Element;
}
export interface RouteComponent extends h.JSX.Element {
  props: Props;
}

const Route = ({ children }: Props): RouteComponent => {
  return <Fragment> {children} </Fragment>;
};

export default Route;
