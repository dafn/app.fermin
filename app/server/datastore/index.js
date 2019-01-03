datastore = new require('@google-cloud/datastore')({
  projectId: 'no-fermin',
})

exports.addNote = async function (user, content) {

  const key = datastore.key('Note')

  try {
    await datastore.save({
      key,
      data: [
        {
          name: 'user',
          value: user
        },
        {
          name: 'content',
          value: content
        }
      ]
    })
    console.log(`Note ${key.id} added successfully.`);
  } catch (err) {
    console.error('Error when adding note', err);
  }
}

exports.updateNote = async function (id, content) {

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
  } catch (err) {
    console.log(`Error when updating Note ${id}`, err)
    transaction.rollback()
  }
}

exports.deleteNote = async function (id) {
  try {
    await datastore.delete(datastore.key(['Note', parseInt(id)]))
    console.log(`Note ${id} deleted successfully.`)
  } catch (error) {
    console.log(`error when deleting Note ${id}`, error)
  }
}

exports.listNotes = async function (user) {
  const query = datastore.createQuery('Note').filter('user', user),
    [notes] = await datastore.runQuery(query)

  let result = []

  notes.forEach(note => {
    result.push({
      user: note.user,
      content: note.content,
      key: note[datastore.KEY].id
    })
  })

  console.log(`Listed notes from user ${user}`)

  return result
}
