datastore = new require('@google-cloud/datastore')({
  projectId: 'no-fermin',
  keyFilename: 'keys/datastore-service-account-key.json'
})

exports.addNote = async (user, content) => {

  const key = datastore.key('Note')

  try {
    await datastore.save({
      key,
      data: [
        { name: 'user', value: user },
        { name: 'content', value: content }
      ]
    })
    console.log(`Note ${key.id} added successfully.`)
    return 200
  } catch (err) {
    console.error('Error when adding note', err)
    return 500
  }
}

exports.updateNote = async (id, content) => {

  const transaction = datastore.transaction()

  try {
    const key = datastore.key(['Note', parseInt(id)])

    await transaction.run()
    const [task] = await transaction.get(key)
    task.content = content
    transaction.save({
      key,
      data: task,
    })
    await transaction.commit()
    console.log(`Note ${id} updated successfully.`)
    return 200
  } catch (err) {
    console.error(`Error when updating Note ${id}`, err)
    transaction.rollback()
    return 500
  }
}

exports.deleteNote = async id => {
  try {
    await datastore.delete(datastore.key(['Note', parseInt(id)]))
    console.log(`Note ${id} deleted successfully.`)
    return 200
  } catch (error) {
    console.error(`error when deleting Note ${id}`, error)
    return 500
  }
}

exports.getNote = async id => {
  const query = datastore.createQuery('Note').filter('__key__', '=', datastore.key(['Note', parseInt(id)])),
    note = await datastore.runQuery(query)

  console.log(`Got note ${id}`)

  return {
    user: note[0][0].user,
    content: note[0][0].content,
    id: note[0][0][datastore.KEY].id
  }
}

exports.listNotes = async user => {
  const query = datastore.createQuery('Note').filter('user', user),
    [notes] = await datastore.runQuery(query)

  let result = []

  notes.forEach(note => {
    result.push({
      user: note.user,
      content: note.content,
      id: note[datastore.KEY].id
    })
  })

  console.log(`Listed notes from user ${user}`)

  return result
}


const Cards = [
  {
    title: '',
    href: '',
    image: '',
    color: '',
    internal: '',
  }
]

exports.getCards = () => {
  return Cards
}