import React, { useContext } from 'react'
import Context from '../../context';
import ReactQuill from 'react-quill'
import { ElementProps } from './types'

import './Element.sass'

const Element = ({ index, value, active }: ElementProps) => {

  const { actions } = useContext(Context)

  const modules = {
    toolbar: null
  }

  let title = value ? value.match(/[^<p>].*?(?=<)/g) : '',
    content = title ? value.replace(title[0], '').replace(value.match(/<p><br><\/p>/), '') : ''

  return (
    <section className={`ListElement_main_container ${active ? 'active' : ''}`} onClick={() => actions.setActiveKey(index) }>
      <article className='ListElement_text_container'>
        <h1 className='ListElement_title_container'>
          <ReactQuill className='ListElement_editor' value={title && title[0] !== 'br>' ? title[0] : 'Untitled Note'} readOnly modules={modules} />
        </h1>
        <div className='ListElement_summary' >
          <ReactQuill className='ListElement_editor' value={content !== '<p><</p>' ? content : ''} readOnly modules={modules} />
        </div>
      </article>
      <div className='ListElement_delete_button' >
        <p onClick={event => { event.stopPropagation(); actions.toggleAlert(true) }}>x</p>
      </div>
    </section>
  )
}

export default Element
