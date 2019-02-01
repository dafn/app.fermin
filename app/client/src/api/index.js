
export const database = {
  add: (content, onSuccess, onError) => {
    fetch('/notes/add', {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
      redirect: "follow",
      referrer: "no-referrer",
      body: `{
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
    fetch('/notes/update', {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
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
    fetch(`/notes/delete/${id}`)
      .then(response => {
        if (response.status === 200) onSuccess()
        else onError('Could not Save the Note ( Status 500 )')
      })
      .catch(err => {
        onError('Could not Save the Note, see console error')
        console.log(err)
      })
  },
  list: (onSuccess, onError) => {
    fetch(`/notes/list/`)
      .then(response => response.json())
      .then(response => onSuccess(response))
      .catch(err => {
        onError('Could not get list of notes, see console error')
        console.log(err)
      })
  }
}
