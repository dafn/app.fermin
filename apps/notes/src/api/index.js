import { GraphQLClient } from "graphql-request"

const graphQL = new GraphQLClient("/gql", { credentials: "same-origin" })

export const database = {
  setNote: ({ id, content, onSuccess, onError }) => {
    if (id)
      graphQL.request(` mutation { setNote(id: "${encodeURI(id)}", content: "${encodeURI(content)}") } `)
        .then(response => { onSuccess() })
        .catch(err => {
          if (err.response.status === 401) window.location = "/auth/login"
          else onError && onError(err) || console.log(err)
        })
    else
      graphQL.request(` mutation { setNote(content: "${encodeURI(content)}") } `)
        .then(response => { onSuccess() })
        .catch(err => {
          if (err.response.status === 401) window.location = "/auth/login"
          else onError && onError(err) || console.log(err)
        })
  },
  deleteNote: ({ id, onSuccess, onError }) => {
    if (!id)
      onError && onError('Could not delete the Note. No id provided')
    else
      graphQL.request(` mutation { deleteNote(id: "${id}") } `)
        .then(response => { onSuccess() })
        .catch(err => {
          if (err.response.status === 401) window.location = "/auth/login"
          else onError && onError(err) || console.log(err)
        })
  },
  getNotes: ({ onSuccess, onError }) => {
    graphQL.request(` { Notes { id, content } } `)
      .then(response => { onSuccess(response) })
      .catch(err => {
        if (err.response.status === 401) window.location = "/auth/login"
        else onError && onError(err) || console.log(err)
      })
  },
  deleteNote2: id => new Promise((resolve, reject) => {

    console.log(id, !!id)

    if (!id)
      reject('Could not delete the Note. No id provided')
    else
      graphQL.request(` mutation { deleteNote(id: "${id}") } `)
        .then(response => resolve(response))
        .catch(err => {
          if (err.response.status === 401) window.location = "/auth/login"
          else reject(err)
        })

  }),
  setNote2: (id, content) => new Promise((resolve, reject) => {
    if (id)
      graphQL.request(` mutation { setNote(id: "${encodeURI(id)}", content: "${encodeURI(content)}") } `)
        .then(response => resolve(response))
        .catch(err => {
          if (err.response.status === 401) window.location = "/auth/login"
          else reject(err)
        })
    else
      graphQL.request(` mutation { setNote(content: "${encodeURI(content)}") } `)
        .then(response => resolve(response))
        .catch(err => {
          if (err.response.status === 401) window.location = "/auth/login"
          else reject(err)
        })
  }),
  getNotes2: () => new Promise((resolve, reject) => {
    graphQL.request(` { Notes { id, content } } `)
      .then(response => resolve(response))
      .catch(err => {
        if (err.response.status === 401) window.location = "/auth/login"
        else reject(err)
      })
  })
}
