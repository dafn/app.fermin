interface Classnames {
  [key: string]: boolean;
}

export default (classnames: Classnames) => {
  let result = "";

  for (let [key, value] of Object.entries(classnames)) {
    if (value) result += key + " ";
  }

  return result;
};
