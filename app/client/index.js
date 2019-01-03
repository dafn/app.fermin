import React, { useState } from 'react'
import reactDom from 'react-dom'
import update from 'immutability-helper'

import List from './src/components/List'
import Note from './src/components/Note'
import Modal from './src/components/Modal'

import Context, { store } from './src/context'

import 'react-quill/dist/quill.snow.css'
import './src/sass/main.sass'

const App = () => {

  const [state, setState] = useState(store)

  const actions = {
    setActiveKey: newActiveKey => {
      setState({ ...state, activeKey: newActiveKey })
    },
    showModal: () => {
      setState({ ...state, alert: true })
    },
    addNewNote: () => {
      setState(update(state, { notes: { $push: [''] } }))
    },
    deleteNote: () => {
      state.notes.splice(state.activeKey, 1)
      setState({ ...state, notes: state.notes, alert: false, activeKey: state.activeKey - 1 > 0 ? state.activeKey - 1 : 0 })
    }
  }

  return (
    <Context.Provider value={{ store: state, setStore: setState, actions }}>
      <div id="wrapper">
        <List />
        <Note Note={state.notes[state.activeKey]} />
        {
          state.alert && (
            <Modal
              message='Are you sure you want to delete this note?'
              positiveButtonText='Delete'
              negativeButtonText='Cancel'
              onNegative={() => setState({ ...state, alert: false })}
              onPositive={() => { actions.deleteNote() }}
            />
          )
        }
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