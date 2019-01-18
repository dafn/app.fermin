const
  express = require('express'),
  compression = require('compression'),
  bodyParser = require('body-parser'),
  path = require('path'),
  main = require('./routes/main'),
  notes = require('./routes/notes'),
  app = express(),
  port = process.env.PORT || 8002

app.use((req, res, next) =>
  req.protocol != 'https' && process.env.NODE_ENV !== 'development' 
    ? res.redirect('https://' + req.hostname + ':' + port + req.baseUrl)
    : next()
)
app.enable('trust proxy')

app.use(compression())
app.use(express.static(path.resolve(__dirname, '../client/dist/'), {
  setHeaders: res => {
    res.set('X-XSS-Protection', '1; mode=block')
    res.set('X-Frame-Options', 'DENY')
  }
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', main)
app.use('/notes', notes)

app.listen(port, () => console.log(`listening on port ${port}`))
