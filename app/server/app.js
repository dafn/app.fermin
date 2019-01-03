const 
  express = require('express'),
  compression = require('compression'),
  bodyParser = require('body-parser'),
  path = require('path'),
  main = require('./routes/main'),
  notes = require('./routes/notes'),
  app = express()

const port = process.env.PORT || 8002

app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.resolve(__dirname, '../client/dist/')))

app.use('/', main)
app.use('/notes', notes)

app.listen(port, () => console.log(`listening on port ${port}`))
