const Cards = require('./hub')

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

exports.addCard = async (title, href, background, TextColor, image, internal, user) => {
  const key = datastore.key('Card')

  try {
    await datastore.save({
      key,
      data: [
        { name: 'title', value: title },
        { name: 'href', value: href },
        { name: 'background', value: background },
        { name: 'TextColor', value: TextColor },
        { name: 'image', value: image },
        { name: 'internal', value: internal },
        { name: 'user', value: user },
      ]
    })
    console.log(`Card ${key.id} added successfully.`)
    return 200
  } catch (err) {
    console.error('Error when adding Card', err)
    return 500
  }
}

exports.getCards = async user => {
  const query = datastore.createQuery('Card').filter('user', user),
    [cards] = await datastore.runQuery(query)

  let result = []

  cards.forEach(card => {
    result.push({
      title: card.title,
      href: card.href,
      background: card.background,
      textColor: card.textColor,
      image: card.image,
      internal: card.internal,
      user: card.user,
      id: card[datastore.KEY].id
    })
  })

  console.log(`Listed cards from user ${user}`)

  return result
}
