import React, { useContext } from 'react'
import Context from '../../context';
import ReactQuill from 'react-quill'

import './Element.sass'

const Element = ({ index, value, active }) => {

  const { actions: { setActiveKey, showModal } } = useContext(Context)

  const modules = {
    toolbar: null
  }

  let title = value ? value.match(/[^<p>].*?(?=<)/g) : '',
    content = title ? value.replace(title[0], '').replace(value.match(/<p><br><\/p>/), '') : ''

  return (
    <section className={`ListElement_main_container ${active ? 'active' : ''}`} onClick={() => setActiveKey(index)}>
      <div className='ListElement_text_container'>
        <div className='ListElement_title_container'>
          <ReactQuill className='ListElement_editor' value={title && title[0] !== 'br>' ? title[0] : 'Untitled Note'} readOnly modules={modules} />
        </div>
        <div className='ListElement_summary' >
          <ReactQuill className='ListElement_editor' value={content !== '<p><</p>' ? content : ''} readOnly modules={modules} />
        </div>
      </div>
      <div className='ListElement_delete_button' >
        <p onClick={event => { event.stopPropagation(); showModal() }}>x</p>
      </div>
    </section>
  )
}

export default Element
