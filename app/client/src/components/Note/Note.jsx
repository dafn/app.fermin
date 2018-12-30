import React, { Component, useState } from 'react'
import ReactQuill from 'react-quill'

const Note = props => {

  const [text, setText] = useState('')

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  return (
    <div id='Note_main_container'>
      <ReactQuill id='editor' value={text}
        onChange={value => setText(value)} modules={modules} />
    </div>
  )
}

export default Note
