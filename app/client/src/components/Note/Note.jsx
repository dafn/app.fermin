import React, { Component, useState, useEffect } from 'react'
import update from 'immutability-helper'
import ReactQuill from 'react-quill'

import Context from '../../context'

const Note = props => {

  const [note, setNote] = useState(props.Note)

  useEffect(() => {
    note !== props.Note && setNote(props.Note)
    console.log(note !== props.Note)
    console.log('note: --', note)
    console.log('Note: --', props.Note)
    // setNote(props.Note)
  })

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
    <Context.Consumer>
      {
        ({ store, store: { notes, activeKey }, setStore }) => {

          const handleChange = value => console.log(value)

          return (
            <div id='Note_main_container'>
              <ReactQuill id='editor'
                value={note}
                onChange={value => {
                  setStore(update(store, { notes: { [activeKey]: { $set: value } } }))
                }
                } modules={modules} />
            </div>
          )
        }
      }
    </Context.Consumer>
  )
}

export default Note

// setStore(update(store, { notes: { [activeKey]: { $set: value } } }))
// update(store, { notes: { [activeKey]: { $set: value } } })

/**
 * <ReactQuill id='editor'
                value={note}
                onChange={value => setStore(update(store, { notes: { [activeKey]: { $set: value } } }))} modules={modules} />
 */