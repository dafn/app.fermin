const
  router = require('express').Router(),
  passport = require('passport'),
  { Terminal } = require('../terminal/colors'),
  { Issuer, Strategy } = require('openid-client'),
  { clientId, clientSecret } = require('../../../keys/gcp-iam')

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

const params = {
  access_type: 'offline',
  scope: 'openid email',
  redirect_uri: process.env.NODE_ENV === 'production'
    ? 'https://app-fermin-dot-no-fermin.appspot.com/auth/cb'
    : 'http://localhost:8002/auth/cb'
}

Issuer.defaultHttpOptions.timeout = 10000
const OIDC_RP = new Issuer({
  issuer: 'https://accounts.google.com',
  authorization_endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  token_endpoint: 'https://www.googleapis.com/oauth2/v4/token',
  userinfo_endpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
  jwks_uri: 'https://www.googleapis.com/oauth2/v3/certs',
  end_session_endpoint: 'https://accounts.google.com/logout'
})

const client = new OIDC_RP.Client({ client_id: clientId, client_secret: clientSecret })

passport.use('oidc', new Strategy({ client, params },
  (tokenset, userinfo, done) => {
    if (userinfo)
      return done(null, userinfo.email)
    return done(null, false)
  }))

router.get('/login', passport.authenticate('oidc'))
router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect(client.endSessionUrl())
})
router.get('/cb', passport.authenticate('oidc', { successRedirect: '/', failureRedirect: '/error' }))

module.exports = {
  authenticate: router,
  isAuthenticated: (req, res, next) => {
    if (process.env.NODE_ENV === 'testing') {
      console.log(`${Terminal.BLUE} Granted${Terminal.RESET}`, `${req.protocol}://${req.get('host')}${req.originalUrl}`)
      next()
    }
    if (req.originalUrl.endsWith('.webmanifest')) {
      console.log(`${Terminal.OK} Granted${Terminal.RESET}`, `${req.protocol}://${req.get('host')}${req.originalUrl}`)
      next()
    }
    else {
      if (req.isAuthenticated()) {
        console.log(`${Terminal.OK} Granted${Terminal.RESET}`, `${req.protocol}://${req.get('host')}${req.originalUrl}`)
        next()
      }
      else {
        console.log(`${Terminal.WARNING} Denied ${Terminal.RESET}`, `${req.protocol}://${req.get('host')}${req.originalUrl}`)
        res.redirect('/auth/login')
      }
    }
  }
}
