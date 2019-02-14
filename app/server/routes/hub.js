const router = require('express').Router(),
  { isAuthenticated } = require('../authentication/openid')


// Each app should be added to the GCP datastore
  const app_metadata = {
    title: '',
    href: '',
    image: '',
    color: '',
    internal: false
  }

  router.get('/apps', isAuthenticated, async (req, res) => {
    // TODO: Fetch all app metadata from datastore
  })
