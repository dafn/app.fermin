import React, { useState } from 'react'
import reactDom from 'react-dom'
import update from 'immutability-helper'

import List from './src/components/List'
import Note from './src/components/Note'
import Modal from './src/components/Modal'
import Header from './src/components/Header'

import Context, { store } from './src/context'
import { database, auth } from './src/api'

import 'react-quill/dist/quill.snow.css'
import './src/sass/main.sass'

const App = () => {

  const [state, setState] = useState(store)

  const actions = {
    endAlert: () => setState({ ...state, saved: false }),
    logout: () => auth.logout(),
    setActiveKey: newActiveKey => setState({ ...state, activeKey: newActiveKey }),
    showModal: () => setState({ ...state, modal: true }),
    addNewNote: () => setState(update(state, { notes: { $push: [{ id: '', content: '' }] } })),
    saveNote: (key, content) => {
      if (state.notes[key].id) {
        setState({ ...state, saving: true })
        database.update(state.notes[key].id, content,
          () => setState({ ...state, saving: false, saved: true }), err => setState({ ...state, saving: false }))
      } else
        database.add(content,
          () => setState({ ...state, saving: false, updateList: true, saved: true }), err => setState({ ...state, saving: false }))
    },
    deleteNote: key => {
      if (state.notes[key].id)
        database.delete(state.notes[key].id,
          () => {
            state.notes.splice(state.activeKey, 1)
            setState({ ...state, notes: state.notes, modal: false, activeKey: state.activeKey - 1 > 0 ? state.activeKey - 1 : 0 })
          },
          err => setState({ ...state, modal: false }))
      else {
        state.notes.splice(state.activeKey, 1)
        setState({ ...state, notes: state.notes, modal: false, activeKey: state.activeKey - 1 > 0 ? state.activeKey - 1 : 0 })
      }
    }
  }

  if (state.updateList)
    database.list(
      response => {
        let notes = []
        for (let note of response.result)
          notes.push({ id: note.id, content: note.content })
        setState({ ...state, updateList: false, notes: notes })
      },
      err => setState({ ...state, saving: false, updateList: false })
    )

  return (
    <Context.Provider value={{ store: state, setStore: setState, actions }}>
      <Header />
      <div id="wrapper">
        <List />
        <Note Note={state.notes[state.activeKey]} />
        {
          state.modal &&
          <Modal
            message='Are you sure you want to delete this note?'
            positiveButtonText='Delete'
            negativeButtonText='Cancel'
            onPositive={key => { actions.deleteNote(key) }}
            onNegative={() => setState({ ...state, modal: false })}
            activeKey={state.activeKey}
          />
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