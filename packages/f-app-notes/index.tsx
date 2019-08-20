import React, { useReducer } from 'react'

import List from './components/List'
import Note from './components/Note'
import Alert from './components/Alert'

import Context from './context'
import Actions from './context/actions'
import { reducer, initialState } from './context/reducer'

import 'react-quill/dist/quill.snow.css'
import './index.sass'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState),
   actions = Actions(dispatch)

  state.updateList && actions.updateList()

  return (
    <Context.Provider value={{ state, actions }}>
      <main id="fermin_notes">
        <List/>
        <Note Note={state.notes[state.activeKey]} />
        {
          state.alert &&
          <Alert
            message='Are you sure you want to delete this note?'
            positiveButtonText='Delete'
            negativeButtonText='Cancel'
            onPositive={key => actions.deleteNote(state.notes[key].id, state.notes, state.activeKey)}
            onNegative={() => actions.toggleAlert(false)}
            activeKey={state.activeKey}
          />
        }
      </main>
    </Context.Provider>
  )
}

export default App
