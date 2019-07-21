import React from 'react'
import reactDom from 'react-dom'

import Header from './src/components/Header'
import Notes from '../apps/notes'
import Hub from '../apps/hub'
import Test from '../apps/test'

import { HashRouter, Route } from 'react-router-dom'

import './index.sass'

const App = () => {
  return (
    <>
      <Header />
      <HashRouter>
        <section id='fermin_apps_container'>
          <Route exact path="/" component={Hub} />
          <Route exact path="/app/notes" component={Notes} />
          <Route exact path="/app/test" component={Test} />
        </section>
      </HashRouter>
    </>
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
