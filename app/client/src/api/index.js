
export const database = {
  add: (user, content, onSuccess, onError) => {
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
      .then(response => {
        if (response.status === 200) onSuccess()
        else onError('Could not Save the Note ( Status 500 )')
      })
      .catch(err => {
        onError('Could not Save the Note, see console error')
        console.log(err)
      })
  },
  update: (id, content, onSuccess, onError) => {
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
      .then(response => {
        if (response.status === 200) onSuccess()
        else onError('Could not Save the Note ( Status 500 )')
      })
      .catch(err => {
        onError('Could not Save the Note, see console error')
        console.log(err)
      })
  },
  delete: (id, onSuccess, onError) => {
    return fetch(`/notes/delete/${id}`)
      .then(response => {
        if (response.status === 200) onSuccess()
        else onError('Could not Save the Note ( Status 500 )')
      })
      .catch(err => {
        onError('Could not Save the Note, see console error')
        console.log(err)
      })
  },
  list: (user, onSuccess, onError) => {
    return fetch(`/notes/list/${user}`)
      .then(response => response.json())
      .then(response => onSuccess(response))
      .catch(err => {
        onError('Could not get list of notes, see console error')
        console.log(err)
      })
  }
}
