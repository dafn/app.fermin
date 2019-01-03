const express = require('express'),
  app = express(),
  compression = require('compression'),
  path = require('path'),
  main = require('./routes/main')

const port = process.env.PORT || 8002

app.use(compression())
app.use(express.static(path.resolve(__dirname, '../client/dist/')))
app.use('/', main)

app.listen(port, () => console.log(`listening on port ${port}`))
