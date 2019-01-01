import React from 'react'
import ListElement from './ListElement'
import update from 'immutability-helper'
import Button from './Button'

import Context from '../../context'

const List = props => {
  return (
    <Context.Consumer>
      {
        ({ store: { notes, activeKey }, actions: { setActiveKey, addNewNote, deleteNote } }) => {
          return (
            <div id='List_main_container'>
              {
                notes.map((value, key) =>
                  <ListElement
                    key={key}
                    index={key}
                    value={value}
                    active={key === activeKey ? true : false}
                    setActiveKey={setActiveKey}
                    deleteNote={deleteNote}
                  />
                )
              }
              <div id='List_add_element_button_container'>
                <Button addNewNote={addNewNote} />
              </div>
            </div>
          )
        }
      }
    </Context.Consumer>

  )
}

export default List