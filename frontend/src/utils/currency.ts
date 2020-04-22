export const NOK = (number: number) => {
  try {
    return new Intl.NumberFormat("nb-no", {
      style: "currency",
      currency: "NOK",
    }).format(number);
  } catch (error) {
    console.error(error);
    return "Unable to parse currency";
  }
};
