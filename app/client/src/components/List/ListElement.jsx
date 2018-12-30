import React, { useState } from 'react'

const ListElement = ({ index, value, active, setActive }) => {

  return (
    <div id='ListElement_main_container' className={active ? 'active' : ''} onClick={() => setActive(index)}>
      <div id='ListElement_title_container'>
        {value.substring(0, 20)}
      </div>
      <div id='ListElement_summary' >
        {value}
      </div>
    </div>
  )
}

export default ListElement