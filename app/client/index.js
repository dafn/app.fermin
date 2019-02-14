import React, { useState } from 'react'
import reactDom from 'react-dom'

import Header from './src/components/Header'
import Notes from './src/apps/notes'
import Hub from './src/apps/hub'

import { HashRouter, Route } from 'react-router-dom'

import './src/sass/main.sass'

const App = () => {

  return (
    <div id='fermin_main_container' >
      <Header />
      <HashRouter>
        <div id='fermin_apps_container'>
          <Route exact path="/" component={Hub} />
          <Route exact path="/app/notes" component={Notes} />
        </div>
      </HashRouter>
    </div>
  )
}

reactDom.render(<App />, document.getElementById('app'))

/*
if ('serviceWorker' in navigator)
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => console.log('ServiceWorker registration successful with scope: ', registration.scope))
      .catch(err => console.error('ServiceWorker registration failed: ', err))
  })
*/