import { GraphQLClient } from "graphql-request"

const graphQL = new GraphQLClient("/gql", { credentials: "same-origin" })

export const database = {
  setNote: ({id, content, onSuccess, onError}) => {
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
  deleteNote: ({id, onSuccess, onError}) => {
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
  getNotes: ({onSuccess, onError}) => {
    graphQL.request(` { Notes { id, content } } `)
      .then(response => { onSuccess(response) })
      .catch(err => {
        if (err.response.status === 401) window.location = "/auth/login"
        else onError && onError(err) || console.log(err)
      })
  }
}
