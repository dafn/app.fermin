let previousLocation = window.location.href;

interface Config {
  append?: boolean;
}

export const root = window.location.origin + "/#";

export const navigate = (route: Route, config?: Config) => {
  if (config?.append) {
    window.location.href = window.location.href + `${route}`;
  } else {
    window.location.href = route === "/" ? root : root + `${route}`;
  }
};

export const onNavigation = (callback: (route: Route) => void) => {
  window.addEventListener("popstate", (state) => {
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
