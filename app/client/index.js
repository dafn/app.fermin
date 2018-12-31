import React, { useState, Component } from 'react'
import update from 'immutability-helper'
import reactDom from 'react-dom'

import List from './src/components/List'
import Note from './src/components/Note'

import Context, { store } from './src/context'

import 'semantic-ui-css/semantic.min.css'
import 'react-quill/dist/quill.snow.css'
import './src/sass/main.sass'

const App = () => {

  const [state, setState] = useState(store)

  return (
    <Context.Provider value={{ store: state, setStore: setState }}>
      <div id="wrapper">
        <List />
        <Note Note={state.notes[state.activeKey]} />
      </div>
    </Context.Provider>
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