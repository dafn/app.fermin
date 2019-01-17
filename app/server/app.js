const
  express = require('express'),
  compression = require('compression'),
  bodyParser = require('body-parser'),
  path = require('path'),
  main = require('./routes/main'),
  notes = require('./routes/notes'),
  app = express(),
  port = process.env.PORT || 8002

app.use(compression())
app.use(express.static(path.resolve(__dirname, '../client/dist/')))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 'default-src "self"')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('X-Frame-Options', 'DENY')
  next()
})

app.use('/', main)
app.use('/notes', notes)

app.listen(port, () => console.log(`listening on port ${port}`))
