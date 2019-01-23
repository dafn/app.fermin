const
  { authenticate, isAuthenticated } = require('./authentication/openid'),
  { session_store_key } = require('../../keys/session-store'),
  redis = process.env.NODE_ENV !== 'development'
    ? require('redis').createClient(6379, 'redis')
    : require('redis').createClient(),
  session = require('express-session'),
  redisSessionStore = require('connect-redis')(session),
  express = require('express'),
  path = require('path'),
  notes = require('./routes/notes'),
  passport = require('passport'),
  port = process.env.PORT || 8002,
  app = express()

app.enable('trust proxy')

app.use(require('compression')())
app.use(require('body-parser').json())
app.use(session({
  store: new redisSessionStore({ client: redis, logErrors: true }),
  secret: session_store_key,
  saveUninitialized: false,
  resave: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/notes', notes)
app.use('/auth', authenticate)

app.use((req, res, next) =>
  req.protocol != 'https' && process.env.NODE_ENV === 'production'
    ? res.redirect('https://' + req.hostname + req.baseUrl)
    : next()
)

app.use(isAuthenticated, express.static(path.resolve(__dirname, '../client/dist/'), {
  setHeaders: res => {
    res.set('X-XSS-Protection', '1; mode=block')
    res.set('X-Frame-Options', 'DENY')
  }
}))

app.listen(port, () => console.log(`listening on port ${port}`))
