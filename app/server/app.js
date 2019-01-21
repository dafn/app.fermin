const
  express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  notes = require('./routes/notes'),
  authenticate = require('./authentication/openid'),
  passport = require('passport'),
  port = process.env.PORT || 8002,
  app = express()

app.enable('trust proxy')

app.use(require('compression')())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('express-session')({ secret: 'keyboard cat' }))
app.use(require('cookie-parser')())

app.use(passport.initialize())
app.use(passport.session())

app.use('/notes', notes)
app.use('/auth', authenticate)

app.use((req, res, next) =>
  req.protocol != 'https' && process.env.NODE_ENV !== 'development'
    ? res.redirect('https://' + req.hostname + req.baseUrl)
    : next()
)

app.use(
  (req, res, next) => { req.isAuthenticated() ? next() : res.redirect('/auth') },
  express.static(path.resolve(__dirname, '../client/dist/'), {
    setHeaders: res => {
      res.set('X-XSS-Protection', '1; mode=block')
      res.set('X-Frame-Options', 'DENY')
    }
  }))

app.listen(port, () => console.log(`listening on port ${port}`))
