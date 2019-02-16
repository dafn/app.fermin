import React, { useState } from 'react'
import update from 'immutability-helper'

import List from './src/components/List'
import Note from './src/components/Note'
import Alert from './src/components/Alert'

import Context, { store } from './src/context'
import { database, auth } from './src/api'

import 'react-quill/dist/quill.snow.css'
import './src/sass/main.sass'

const App = () => {

  const [state, setState] = useState(store)

  const actions = {
    endAlert: () => setState({ ...state, saved: false }),
    setActiveKey: newActiveKey => setState({ ...state, activeKey: newActiveKey }),
    showModal: () => setState({ ...state, alert: true }),
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
            setState({ ...state, notes: state.notes, alert: false, activeKey: state.activeKey - 1 > 0 ? state.activeKey - 1 : 0 })
          },
          err => setState({ ...state, alert: false }))
      else {
        state.notes.splice(state.activeKey, 1)
        setState({ ...state, notes: state.notes, alert: false, activeKey: state.activeKey - 1 > 0 ? state.activeKey - 1 : 0 })
      }
    }
  }

  if (state.updateList)
    database.list(
      response => {
        setState({ ...state, updateList: false, notes: response })
      },
      err => setState({ ...state, saving: false, updateList: false })
    )

  return (
    <Context.Provider value={{ store: state, setStore: setState, actions }}>
      <div id="fermin_notes">
        <List />
        <Note Note={state.notes[state.activeKey]} />
        {
          state.alert &&
          <Alert
            message='Are you sure you want to delete this note?'
            positiveButtonText='Delete'
            negativeButtonText='Cancel'
            onPositive={key => { actions.deleteNote(key) }}
            onNegative={() => setState({ ...state, alert: false })}
            activeKey={state.activeKey}
          />
        }
      </div>
    </Context.Provider>
  )
}

export default App
