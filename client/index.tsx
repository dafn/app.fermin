import React from 'react'
import reactDom from 'react-dom'

import Header from './src/components/Header'
import Notes from '../apps/notes'
import Hub from '../apps/hub'

import { HashRouter, Route } from 'react-router-dom'

import './index.sass'

const App = () => {
  return (
    <>
      <Header />
      <HashRouter>
        <>
          <Route exact path="/" component={Hub} />
          <Route exact path="/app/notes" component={Notes} />
        </>
      </HashRouter>
    </>
  )
}

reactDom.render(<App />, document.getElementById('app'))
