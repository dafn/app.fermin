import React, { useState, useEffect, useContext } from 'react'
import update from 'immutability-helper'
import ReactQuill from 'react-quill'

import Context from '../../context'

import './Note.sass'

const Note = props => {

  const [note, setNote] = useState(),
    { store, store: { activeKey, saving, saved }, setStore, actions } = useContext(Context)

  useEffect(() => {
    setNote(props.Note)
  }, [props.Note])

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link'], ['clean']
    ],
  }

  const handleOnSaveClick = () => !saving && !saved && actions.saveNote(activeKey, note.content)

  saved && window.setTimeout(() => actions.endAlert(), 1000)

  return (
    <section id='Note_main_container'>
      <div id='Note_save_button_button' className={`${saving ? 'saving' : ''} ${saved ? 'saved' : ''}`} onClick={handleOnSaveClick}>
        { saved ? 'Saved' : 'Save' }
      </div>
      {
        note &&
        <ReactQuill id='editor'
          value={note.content}
          onChange={value => {
            if (value === note.content) return
            setNote({ ...note, id: props.Note.id, content: value })
            setStore(update(store, { notes: { [activeKey]: { content: { $set: value } } } }))
          }}
          modules={modules} />
      }
    </section>
  )
}

export default Note
