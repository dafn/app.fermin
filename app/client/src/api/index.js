
export const database = {
  add: (user, content) => {
    fetch('/notes/add', {
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
      .then(reseponse => reseponse.json)
      .catch(err => console.log(err))
  },
  update: (id, content) => {
    fetch('/notes/update', {
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
      .then(reseponse => reseponse.status)
      .catch(err => console.log(err))
  },
  delete: id => {
    return fetch(`/notes/delete/${id}`)
      .catch(err => console.log(err))
  },
  list: user => {
    return fetch(`/notes/list/${user}`)
      .then(response => response.json())
      .catch(err => console.log(err))
  }
}
