const router = require('express').Router(),
  { addNote, updateNote, deleteNote, listNotes } = require('../datastore')

router.get('/add2', async (req, res) => {

  await addNote('dafn@outlook.com', '<p>this is some example text tet7654</p>')
  await addNote('dafn@outlook.com', '<p>this is some example text</p>')
  await addNote('dafn@outlook.com', '<p>this is some example text halla balla</p>')

  res.send('okidoki')
})

router.post('/add', async (req, res) => {

  let transaction = await addNote(req.body.user, req.body.content)

  if (transaction === 500)
    res.sendStatus(500)
  else
    res.send({
      id: transaction
    })
})

router.post('/update', async (req, res) => {
  res.sendStatus(await updateNote(req.body.id, req.body.content))
})

router.get('/delete/:id', async (req, res) => {
  res.sendStatus(await deleteNote(req.params.id))
})

router.get('/list/:user', async (req, res) => {
  res.send(await listNotes(req.params.user))
})

module.exports = router
