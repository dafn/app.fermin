const router = require('express').Router(),
  { addNote, updateNote, deleteNote, listNotes } = require('../datastore'),
  path = require('path')


router.post('/add', async (req, res) => {
  console.log(req.body)
  res.send('add')
})

router.post('/update', (req, res) => {
  console.log(req.body)
  res.send('update')
})

router.get('/delete/:id', (req, res) => {
  deleteNote(req.params.id)
  res.sendStatus(200)
})

router.get('/list/:user', async (req, res) => {
  res.send(await listNotes(req.params.user))
})

module.exports = router
