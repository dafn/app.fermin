import { GraphQLClient } from "graphql-request"

const graphQL = new GraphQLClient("/gql", { credentials: "same-origin" })

export const database = {
  deleteNote: id => new Promise((resolve, reject) => {
    if (!id)
      reject('Could not delete the Note. No id provided')
    else
      graphQL.request(` mutation { deleteNote(id: "${id}") } `)
        .then(response => resolve(response))
        .catch(err => {
          if (err.response.status === 401) window.location.href = "/auth/login"
          else reject(err)
        })

  }),
  upsertNote: (id, content) => new Promise((resolve, reject) => {
    if (id)
      graphQL.request(` mutation { setNote(id: "${encodeURI(id)}", content: "${encodeURI(content)}") } `)
        .then(response => resolve(response))
        .catch(err => {
          if (err.response.status === 401) window.location.href = "/auth/login"
          else reject(err)
        })
    else
      graphQL.request(` mutation { setNote(content: "${encodeURI(content)}") } `)
        .then(response => resolve(response))
        .catch(err => {
          if (err.response.status === 401) window.location.href = "/auth/login"
          else reject(err)
        })
  }),
  updateList: () => new Promise((resolve, reject) => {
    graphQL.request(` { Notes { id, content } } `)
      .then(response => resolve(response))
      .catch(err => {
        if (err.response.status === 401) window.location.href = "/auth/login"
        else reject(err)
      })
  })
}
