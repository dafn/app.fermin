import React from 'react'
import Context from '../../context';
import ReactQuill from 'react-quill'

const Element = ({ index, value, active }) => {

  const modules = {
    toolbar: null
  }

  return (
    <Context.Consumer>
      {
        ({ actions: { setActiveKey, showModal } }) => {
          let title = value ? value.match(/[^<p>].*?(?=<)/g)[0] : '',
            content = title ? value.replace(title, '').replace(value.match(/<p><br><\/p>/), '') : ''
          return (
            <div className={`ListElement_main_container ${active ? 'active' : ''}`} onClick={() => setActiveKey(index)}>
              <div className='ListElement_text_container'>
                <div className='ListElement_title_container'>
                  {
                    title && title !== 'br>'
                      ? <ReactQuill className='ListElement_editor' value={title} readOnly modules={modules} />
                      : 'Untitled Note'
                  }
                </div>
                <div className='ListElement_summary' >
                  <ReactQuill className='ListElement_editor' value={content !== '<p><</p>' ? content : ''} readOnly modules={modules} />
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

export default Element
