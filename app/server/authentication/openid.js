const
  router = require('express').Router(),
  passport = require('passport'),
  { Issuer, Strategy } = require('openid-client'),
  { clientId, clientSecret } = require('../../../keys/gcp-iam')

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

Issuer.defaultHttpOptions.timeout = 10000
Issuer.discover('https://accounts.google.com')
  .then(discoveredIssuer => {
    const params = {
      access_type: 'offline',
      scope: 'openid email',
      redirect_uri: process.env.NODE_ENV === 'production'
        ? 'https://fermin-notes-dot-no-fermin.appspot.com/auth/cb'
        : 'http://localhost:8002/auth/cb'
    }

    passport.use('oidc', new Strategy({ client: new discoveredIssuer.Client({ client_id: clientId, client_secret: clientSecret }), params },
      (tokenset, userinfo, done) => {
        if (userinfo)
          return done(null, userinfo.email)
        return done(null, false)
      }))
  })
  .catch(err => console.log(err))

router.get('/', passport.authenticate('oidc'))
router.get('/cb', passport.authenticate('oidc', { successRedirect: '/', failureRedirect: '/error' }))

module.exports = {
  authenticate: router,
  isAuthenticated: (req, res, next) => { console.log(req.isAuthenticated()); req.isAuthenticated() ? next() : res.redirect('/auth') }
}
