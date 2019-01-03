const router = require('express').Router(),
  path = require('path')

router.get('/', (req, res) => {
  res.sendfile(path.resolve(__dirname, '../../client/dist/index.html'))
})

module.exports = router
