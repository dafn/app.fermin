const
  { authenticate, isAuthenticated } = require('./authentication/openid'),
  { session_store_key } = require('../../keys/session-store'),
  { Terminal } = require('./terminal/colors'),
  express = require('express'),
  session = require('express-session'),
  redis = require('connect-redis')(session),
  path = require('path'),
  notes = require('./routes/notes'),
  passport = require('passport'),
  port = process.env.PORT || 8002,
  app = express()

if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy')

  app.use((req, res, next) => req.protocol != 'https'
    ? res.redirect('https://' + req.hostname + req.baseUrl)
    : next()
  )
}

app.use(require('compression')())
app.use(require('body-parser').json())

app.use(session({
  store: new redis({ port: 6379 }),
  secret: session_store_key,
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
  cookie: { secure: process.env.NODE_ENV === 'production' },
  maxAge: 2628000
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/notes', notes)
app.use('/auth', authenticate)

app.use(isAuthenticated, express.static(path.resolve(__dirname, '../client/dist/'), {
  setHeaders: res => {
    res.set('X-XSS-Protection', '1; mode=block')
    res.set('X-Frame-Options', 'DENY')
  }
}))

app.listen(port, () => console.log(`listening on port ${port} 👍`))
