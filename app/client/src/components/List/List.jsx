import React from 'react'
import Element from '../Element'
import Context from '../../context'

const List = props => {
  return (
    <Context.Consumer>
      {
        ({ store: { notes, activeKey }, actions: { addNewNote } }) => {
          return (
            <nav id='List_main_container'>
              {
                notes.map((value, key) =>
                  <Element
                    key={key}
                    index={key}
                    value={value.content}
                    active={key === activeKey}
                  />
                )
              }
              <div id='List_add_element_button_container'>
                <div id='List_add_element_button' onClick={addNewNote}>
                  +
                </div>
              </div>
            </nav>
          )
        }
      }
    </Context.Consumer>
  )
}

export default List