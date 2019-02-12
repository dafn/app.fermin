import React from 'react'
import reactDom from 'react-dom'

import Header from './src/components/Header'
import Notes from './src/apps/notes'

import './src/sass/main.sass'

const App = () => {
  return (
    <div id='fermin_apps_container' >
      <Header />
      <Notes />
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