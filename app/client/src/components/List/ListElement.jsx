import React, { useState, useEffect } from 'react'
import Context from '../../context';
import ReactQuill from 'react-quill'


const ListElement = ({ index, value, active }) => {

  const modules = {
    toolbar: null
  }

  return (
    <Context.Consumer>
      {
        ({ actions: { setActiveKey, showModal } }) => {
          return (
            <div className={active ? 'ListElement_main_container active' : 'ListElement_main_container'} onClick={() => setActiveKey(index)}>
              <div className='ListElement_text_container'>
                <div className='ListElement_title_container'>
                {
                  value && value.match(/[^<p>].*?(?=<)/g)[0] !== 'br>'
                  ? <ReactQuill className='ListElement_editor' value={value.match(/[^<p>].*?(?=<)/g)[0]} readOnly modules={modules} />
                  : 'Untitled Note'
                }
                </div>
                <div className='ListElement_summary' >
                  <ReactQuill className='ListElement_editor' value={value ? value.replace(value.match(/[^<p>].*?(?=<)/g)[0], '') : ''} readOnly modules={modules} />
                </div>
              </div>
              <div className='ListElement_delete_button' >
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
