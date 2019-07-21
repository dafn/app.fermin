import React, { useReducer, useContext } from 'react'
import ReactDOM from 'react-dom'

import Component1 from './Component1'
import Component2 from './Component2'

import Context from './constext'

import reducer from './reducer'

const App = props => {

  const [state, dispatch] = useReducer(reducer, { text: 'INIT' });

  return (
    <Context.Provider value={{ state, dispatch }} >
      <Component1 />
      <Component2 />
    </Context.Provider>
  )
}

export default App
