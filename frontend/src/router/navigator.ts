interface Config {
  append?: boolean;
}

const root = window.location.origin + "/#";
let previousLocation = window.location.href;

export const navigate = (route: Route, config?: Config) => {
  if (config?.append) {
    window.location.href = window.location.href + route;
  } else {
    window.location.href = route === "/" ? root : root + route;
  }
};

export const onNavigation = (callback: (route: Route) => void) => {
  window.addEventListener("popstate", () => {
    if (window.location.href === previousLocation) return;

    previousLocation = window.location.href;

    let location = window.location.href.replace(root, "");

    if (location === "") location = "/";

    callback(location as Route);
  });
};

export const getCurrentRoute = (): Route => {
  let location = window.location.href.replace(root, "");

  if (location === "") location = "/";

  return location as Route;
};

export const buildHref = (route: Route) => {
  return root + route;
};
