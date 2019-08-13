import React, { useReducer } from 'react'

import List from './src/components/List'
import Note from './src/components/Note'
import Alert from './src/components/Alert'

import Context from './src/context'
import Actions from './src/context/actions'
import { reducer, initialState } from './src/context/reducer'

import 'react-quill/dist/quill.snow.css'
import './index.sass'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState),
   actions = Actions(dispatch)

  state.updateList && actions.updateList()

  return (
    <Context.Provider value={{ state, actions }}>
      <div id="fermin_notes">
        <List
          
        />
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
      </div>
    </Context.Provider>
  )
}

export default App
