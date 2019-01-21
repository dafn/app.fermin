const
  router = require('express').Router(),
  passport = require('passport'),
  { Issuer, Strategy } = require('openid-client'),
  { clientId, clientSecret } = require('../../../keys/gcp-iam')

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

Issuer.discover('https://accounts.google.com')
  .then(discoveredIssuer => {
    // console.log('Discovered issuer %s %O', discoveredIssuer.issuer, discoveredIssuer.metadata)

    const params = {
      access_type: 'offline',
      redirect_uri: 'https://fermin-notes-dot-no-fermin.appspot.com/auth/cb',
      scope: 'openid email'
    }

    passport.use('oidc', new Strategy({ client: new discoveredIssuer.Client({ client_id: clientId, client_secret: clientSecret }), params }, (tokenset, userinfo, done) => {
      console.log('userinfo --------------------', userinfo)

      if (userinfo)
        return done(null, userinfo)
      return done(null, false)
    }))
  })

router.get('/', passport.authenticate('oidc'))
router.get('/cb', passport.authenticate('oidc', {
  successRedirect: '/',
  failureRedirect: '/error'
}))

module.exports = router
