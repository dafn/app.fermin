
export const database = {
  add: (user, content) => {
    return fetch('/notes/add', {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrer: "no-referrer",
      body: `{
        "user": "${user}",
        "content": "${content}"
      }`
    })
  },
  update: (id, content) => {
    return fetch('/notes/update', {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrer: "no-referrer",
      body: `{
        "id": "${id}",
        "content": "${content}"
      }`
    })
  },
  delete: id => {
    return fetch(`/notes/delete/${id}`)
  },
  list: user => {
    return fetch(`/notes/list/${user}`)
  }
}
