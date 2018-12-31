import React, { Component, useState, useEffect } from 'react'
import update from 'immutability-helper'
import ReactQuill from 'react-quill'

import Context from '../../context'

const Note = props => {

  const [note, setNote] = useState(props.Note)

  useEffect(() => {
    setNote(props.Note)
  }, [props.Note])

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link'],
      ['clean']
    ],
  }

  return (
    <Context.Consumer>
      {
        ({ store, store: { activeKey }, setStore }) => {
          return (
            <div id='Note_main_container'>
              <ReactQuill id='editor'
                value={note}
                onChange={value => {
                  if (value === note) return
                  setNote(value)
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
