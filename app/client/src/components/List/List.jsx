import React from 'react'
import ListElement from './ListElement'

import Context from '../../context'

const List = props => {
  return (
    <Context.Consumer>
      {
        ({ store, store: { notes, activeKey }, setStore }) => {

          const setActiveKey = activeKey =>
            setStore({
              ...store,
              activeKey
            })

          return (
            <div id='List_main_container'>
              {
                notes.map((value, key) => <ListElement key={key} index={key} value={value} active={key === activeKey ? true : false} setActiveKey={setActiveKey} />)
              }
              <div id='List_add_element_button_container'>
                <div id='List_add_element_button'>
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