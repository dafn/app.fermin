import React, { useState } from 'react'
import reactDom from 'react-dom'
import update from 'immutability-helper'

import List from './src/components/List'
import Note from './src/components/Note'
import Modal from './src/components/Modal'

import Context, { store } from './src/context'
import { database } from './src/api'

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
      setState(update(state, {
        notes: {
          $push: [{
            id: '',
            content: ''
          }]
        }
      }))
    },
    saveNote: key => {
      database.add(state.user, state.notes[key])
        .then(response => {
          if (response.status === 200) return
          else setState({ ...state, error: 'Could not Save the Note ( Status 500 )' })
        })
        .catch(err => {
          setState({ ...state, error: 'Could not Save the Note, see console error' })
          console.log(err)
        })
    },
    deleteNote: key => {
      if (state.notes[key].id)
        database.delete(state.notes[key].id)
          .then(response => {
            if (response.status === 200) {
              state.notes.splice(state.activeKey, 1)
              setState({ ...state, notes: state.notes, alert: false, activeKey: state.activeKey - 1 > 0 ? state.activeKey - 1 : 0 })
            }
            else
              setState({ ...state, error: 'Could not delete the Note ( Status 500 )' })
          })
          .catch(err => {
            setState({ ...state, error: 'Could not delete the Note, see console error' })
            console.log(err)
          })
      else {
        state.notes.splice(state.activeKey, 1)
        setState({ ...state, notes: state.notes, alert: false, activeKey: state.activeKey - 1 > 0 ? state.activeKey - 1 : 0 })
      }
    }
  }

  if (state.updateList)
    database.list(state.user)
      .then(response => response.json())
      .then(response => {
        console.log('response.result', response.result)
        let notes = []
        for (let note of response.result)
          notes.push({
            id: note.id,
            content: note.content
          })
        console.log('notes', notes)

        setState({ ...state, updateList: false, notes: notes })
      })
      .catch(err => {
        setState({ ...state, error: 'Could not get list of notes, see console error' })
        console.log(err)
      })

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
              onPositive={key => { actions.deleteNote(key) }}
              activeKey={state.activeKey}
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