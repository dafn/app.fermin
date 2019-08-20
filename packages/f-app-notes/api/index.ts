import { GraphQLClient } from "graphql-request"

const graphQL = new GraphQLClient("/gql", { credentials: "same-origin" })

export const database = {
  deleteNote: (id: string) => new Promise((resolve, reject) => {
    graphQL.request(` mutation { deleteNote(id: "${id}") } `)
      .then((response: Response) => resolve(response))
      .catch((err: any) => {
        if (err.response.status === 401) window.location.href = "/auth/login"
        else reject(err)
      })
  }),
  upsertNote: (content: string, id?: string) => new Promise((resolve, reject) => {
    if (id)
      graphQL.request(` mutation { setNote(id: "${encodeURI(id)}", content: "${encodeURI(content)}") } `)
        .then((response: Response) => resolve(response))
        .catch((err: any) => {
          if (err.response.status === 401) window.location.href = "/auth/login"
          else reject(err)
        })
    else
      graphQL.request(` mutation { setNote(content: "${encodeURI(content)}") } `)
        .then((response: Response) => resolve(response))
        .catch((err: any) => {
          if (err.response.status === 401) window.location.href = "/auth/login"
          else reject(err)
        })
  }),
  updateList: () => new Promise((resolve, reject) => {
    graphQL.request(` { Notes { id, content } } `)
      .then((response: Response) => resolve(response))
      .catch((err: any) => {
        if (err.response.status === 401) window.location.href = "/auth/login"
        else reject(err)
      })
  })
}
