import React, { useState, useEffect } from 'react'
import Context from '../../context';

const ListElement = ({ index, value, active, setActiveKey, deleteNote }) => {

  const [parsedNote, setParsedNote] = useState(value.replace(/<\/?[^>]+(>|$)/g, ''))

  useEffect(() => {
    setParsedNote(value.replace(/<\/?[^>]+(>|$)/g, ''))
  }, [value])

  return (
    <div id='ListElement_main_container' className={active ? 'active' : ''} onClick={() => setActiveKey(index)}>
      <div id='ListElement_text_container'>
        <div id='ListElement_title_container'>
          {
            parsedNote ? parsedNote.split('\n')[0].slice(0, 20) : '< Empty note >'
          }
        </div>
        <div id='ListElement_summary' >
          {
            parsedNote
          }
        </div>
      </div>
      <div id='ListElement_delete_button' >
        <p onClick={event => {
          event.stopPropagation(); deleteNote()
        }}>x</p>
      </div>
    </div>
  )
}

export default ListElement
