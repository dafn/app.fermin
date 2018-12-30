import React from 'react'
import reactDom from 'react-dom'

import List from './src/components/List'
import Note from './src/components/Note'

import 'semantic-ui-css/semantic.min.css'
import 'react-quill/dist/quill.snow.css'
import './src/sass/main.sass'

const App = () => {
  return (
    <div id="wrapper">
      <List />
      <Note />
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