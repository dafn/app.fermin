const router = require('express').Router(),
  { isAuthenticated } = require('../authentication/openid'),
  { addNote, updateNote, deleteNote, listNotes } = require('../datastore')

router.post('/add', isAuthenticated, async (req, res) => {
  if (req.user && req.body.content)
    res.sendStatus(await addNote(req.user, req.body.content))
  else
    res.sendStatus(400)
})

router.post('/update', isAuthenticated, async (req, res) => {
  if (req.user && req.body.id && req.body.content)
    res.sendStatus(await updateNote(req.body.id, req.body.content))
  else
    res.sendStatus(400)
})

router.get('/delete/:id', isAuthenticated, async (req, res) => {
  if (req.user && req.params.id)
    res.sendStatus(await deleteNote(req.params.id))
  else
    res.sendStatus(400)
})

router.get('/list/', isAuthenticated, async (req, res) => {
  if (req.user)
    res.send(await listNotes(req.user))
  else
    res.sendStatus(400)
})

module.exports = router
