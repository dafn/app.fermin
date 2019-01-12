import React from 'react'
import ListElement from './ListElement'

import Context from '../../context'

const List = props => {
  return (
    <Context.Consumer>
      {
        ({ store: { notes, activeKey }, actions: { addNewNote } }) => {
          return (
            <div id='List_main_container'>
              {
                notes.map((value, key) =>
                  <ListElement
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
            </div>
          )
        }
      }
    </Context.Consumer>
  )
}

export default List