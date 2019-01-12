import React, { useState, useEffect } from 'react'
import Context from '../../context';

const ListElement = ({ index, value, active }) => {

  const [parsedNote, setParsedNote] = useState()

  useEffect(() => {
    setParsedNote(value.replace(/<\/?[^>]+(>|$)/g, ''))
  }, [value])

  return (
    <Context.Consumer>
      {
        ({ actions: { setActiveKey, showModal } }) => {
          return (
            <div id='ListElement_main_container' className={active ? 'active' : ''} onClick={() => setActiveKey(index)}>
              <div id='ListElement_text_container'>
                <div id='ListElement_title_container'>
                  {
                    parsedNote ? value.substring(3, 20).split('</p><p>')[0].replace(/<\/?[^>]+(>|$)/g, '') : '< Empty note >'
                  }
                </div>
                <div id='ListElement_summary' >
                  {
                    parsedNote
                  }
                </div>
              </div>
              <div id='ListElement_delete_button' >
                <p onClick={event => { event.stopPropagation(); showModal() }}>x</p>
              </div>
            </div>
          )
        }
      }
    </Context.Consumer>

  )
}

export default ListElement
