import React, { useState } from 'react'

import { Card } from 'semantic-ui-react'
import ListElement from './ListElement'

const List = props => {

  const [active, setActive] = useState(0)

  const notes = [
    {
      text: 'this is some example text'
    },
    {
      text: 'this is some example text'
    },
    {
      text: 'this is some example text'
    }
  ]

  return (
    <div id='List_main_container'>
      {
        notes.map((value, key) => <ListElement key={key} index={key} value={value.text} active={key === active ? true : false} setActive={setActive} />)
      }
      <div id='List_add_element_button_container'>
        <div id='List_add_element_button'>
          +
        </div>
      </div>

    </div>

  )
}

export default List