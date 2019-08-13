import React, { useContext } from 'react'
import Element from '../Element'
import Context from '../../context'

import './List.sass'

const List = () => {

  const { state, actions } = useContext(Context)

  return (
    <nav id='List_main_container'>
      {
        state.notes.map((value, key) =>
          <Element key={key} index={key} value={value.content} active={key === state.activeKey} />
        )
      }
      <div id='List_add_element_button_container'>
        <div id='List_add_element_button' onClick={() => actions.addNote()}>
          +
      </div>
      </div>
    </nav>
  )
}

export default List
