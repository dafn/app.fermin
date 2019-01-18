const router = require('express').Router(),
  { addNote, updateNote, deleteNote, listNotes } = require('../datastore')

router.post('/add', async (req, res) => {
  if (req.body.user && req.body.content)
    if (await addNote(req.body.user, req.body.content) === 500)
      res.sendStatus(500)
    else
      res.send({ id: transaction })
  else
    res.sendStatus(400)
})

router.post('/update', async (req, res) => {
  if (req.body.id && req.body.content)
    res.sendStatus(await updateNote(req.body.id, req.body.content))
  else
    res.sendStatus(400)
})

router.get('/delete/:id', async (req, res) => {
  if (req.params.id)
    res.sendStatus(await deleteNote(req.params.id))
  else
    res.sendStatus(400)
})

router.get('/list/:user', async (req, res) => {
  if (req.params.user)
    res.send(await listNotes(req.params.user))
  else
    res.sendStatus(400)
})

module.exports = router
