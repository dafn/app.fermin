interface Config {
  append?: boolean;
}

export const root = window.location.origin + "/#";

export const navigate = (route: Route, config?: Config) => {

  if (config?.append) {
    window.location.href = window.location.href + `/${route}`;
  } else {
    window.location.href = route === "/" ? root : root + `/${route}`;
  }
};
