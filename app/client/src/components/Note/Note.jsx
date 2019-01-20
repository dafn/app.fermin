import React, { useState, useEffect } from 'react'
import update from 'immutability-helper'
import ReactQuill from 'react-quill'

import Context from '../../context'

const Note = props => {

  const [note, setNote] = useState()

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

  return (
    <Context.Consumer>
      {
        ({ store, store: { activeKey, saving }, setStore, actions }) => {
          return (
            <section id='Note_main_container'>
              <div id='Note_buttons' >
                <div onClick={() => !saving && actions.saveNote(activeKey)}>
                  <div className={saving ? 'saving' : ''} id='Note_save_button_button'>
                    Save
                  </div>
                </div>
                { /*
                  <div>
                    <div id='Note_logout_button'>
                      Log out
                    </div>
                  </div>
                */ }
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
      }
    </Context.Consumer>
  )
}

export default Note
