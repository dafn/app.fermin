import { GraphQLClient } from "graphql-request"

const graphQL = new GraphQLClient("/gql", { credentials: "same-origin" })

export const database = {
  setNote: ({id, content, onSuccess, onError}) => {
    if (id)
      graphQL.request(` mutation { setNote(id: "${encodeURI(id)}", content: "${encodeURI(content)}") } `)
        .then(response => {
          onSuccess()
        })
        .catch(err => {
          onError('Could not Save the Note, see console error')
          console.error(err)
        })
    else
      graphQL.request(` mutation { setNote(content: "${encodeURI(content)}") } `)
        .then(response => {
          onSuccess()
        })
        .catch(err => {
          onError('Could not Save the Note, see console error')
          console.error(err)
        })
  },
  deleteNote: ({id, onSuccess, onError}) => {
    if (!id)
      onError('Could not delete the Note. No id provided')
    else
      graphQL.request(` mutation { deleteNote(id: "${id}") } `)
        .then(response => {
          onSuccess()
        })
        .catch(err => {
          onError('Could not delete the Note. See console error')
          console.error(err)
        })
  },
  getNotes: ({onSuccess, onError}) => {
    graphQL.request(` { Notes { id, content } } `)
      .then(response => {
        onSuccess(response)
      })
      .catch(err => {
        onError('Could not get list of notes, see console error')
        console.error(err)
      })
  }
}
