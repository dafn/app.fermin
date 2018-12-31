import React, { useState } from 'react'

const ListElement = ({ index, value, active, setActiveKey }) => {

  return (
    <div id='ListElement_main_container' className={active ? 'active' : ''} onClick={() => setActiveKey(index)}>
      <div id='ListElement_title_container'>
        hi
      </div>
      <div id='ListElement_summary' >
        {value}
      </div>
    </div>
  )
}

export default ListElement
