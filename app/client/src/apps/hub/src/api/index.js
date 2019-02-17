import { GraphQLClient } from "graphql-request"

const graphql = new GraphQLClient("/gql", { credentials: "same-origin" })

export const datastore = {
  Cards: ({ onSuccess, onError }) => {
    graphql.request(`{ Cards { title href background image color internal } }`)
      .then(response => { onSuccess(response) })
      .catch(err => { onError(err) })
  }
}
