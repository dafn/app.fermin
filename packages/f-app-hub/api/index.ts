import { GraphQLClient } from "graphql-request";
import { CardType, onErrorType, onSuccessType } from "./types";

const graphql = new GraphQLClient("/gql", { credentials: "same-origin" });

export const datastore = {
  addCard: (
    {
      title,
      href = "#",
      background = "white",
      textColor = "black",
      image,
    }: CardType,
    onSuccess?: onSuccessType,
    onError?: onErrorType
  ) => {
    graphql
      .request(
        `mutation { addCard(title: "${title}", href: "${href}", background: "${background}", textColor: "${textColor}", image: "${image}") }`
      )
      .then((response) => {
        onSuccess && onSuccess(response);
      })
      .catch((err) => {
        if (err.response.status === 401) window.location.href = "/auth/login";
        else onError ? onError(err) : console.log(err);
      });
  },
  Cards: (onSuccess?: onSuccessType, onError?: onErrorType) => {
    graphql
      .request(`{ Cards { title href background image textColor id } }`)
      .then((response) => {
        onSuccess(response);
      })
      .catch((err) => {
        if (err.response.status === 401) window.location.href = "/auth/login";
        else onError ? onError(err) : console.log(err);
      });
  },
};
