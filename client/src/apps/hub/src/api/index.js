import { GraphQLClient } from "graphql-request"

const graphql = new GraphQLClient("/gql", { credentials: "same-origin" })

export const datastore = {
  addCard: ({ title, href, background, image, textColor, id }, onSuccess, onError) => {
    graphql.request(`mutation { addCard(title: "${title}", href: "${href || '#'}", background: "${background || 'white'}", textColor: "${textColor || 'black'}", image: "${image}") }`)
      .then(response => { onSuccess && onSuccess(response) })
      .catch(err => { 
        if (err.response.status === 401) window.location = "/auth/login"
        else onError && onError(err) || console.log(err)
      })
  },
  Cards: ({ onSuccess, onError }) => {
    graphql.request(`{ Cards { title href background image textColor id } }`)
      .then(response => { onSuccess(response) })
      .catch(err => { 
        if (err.response.status === 401) window.location = "/auth/login"
        else onError && onError(err) || console.log(err)
      })
  }
}
