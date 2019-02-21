import { GraphQLClient } from "graphql-request"

const graphql = new GraphQLClient("/gql", { credentials: "same-origin" })

export const datastore = {
  addCard: (card, onSuccess, onError) => {
    graphql.request(`mutation { addCard(title: "${card.title}", href: "${card.title}", background: "${card.background}", textColor: "${card.textColor}", image: "${card.image}") }`)
      .then(response => { onSuccess && onSuccess(response) })
      .catch(err => { onError && onError(err) || console.log(err) })
  },
  Cards: ({ onSuccess, onError }) => {
    graphql.request(`{ Cards { title href background image textColor internal, id } }`)
      .then(response => { onSuccess(response) })
      .catch(err => { onError(err) })
  }
}
