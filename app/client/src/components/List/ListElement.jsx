import React, { useState, useEffect } from 'react'
import Context from '../../context';
import ReactQuill from 'react-quill'


const ListElement = ({ index, value, active }) => {

  const [parsedNote, setParsedNote] = useState()

  useEffect(() => {
    setParsedNote(value.replace(/<\/?[^>]+(>|$)/g, ''))
  }, [value])

  const modules = {
    toolbar: null
  }

  return (
    <Context.Consumer>
      {
        ({ actions: { setActiveKey, showModal } }) => {
          return (
            <div id='ListElement_main_container' className={active ? 'active' : ''} onClick={() => setActiveKey(index)}>
              <div id='ListElement_text_container'>
                <div id='ListElement_title_container'>
                  <ReactQuill id='List_element_editor' value={value && value.match(/[^<p>].+?(?=<)/g)[0]} readOnly modules={modules} />
                </div>
                <div id='ListElement_summary' >
                  <ReactQuill id='List_element_editor' value={value} readOnly modules={modules} />
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
