import React, { useState, useEffect, useContext } from 'react'
import update from 'immutability-helper'
import ReactQuill from 'react-quill'

import Context from '../../context'

import { NoteProps } from './types'

import './Note.sass'
import { Note } from '../../context/types';

const Note = (props: NoteProps) => {

  const [note, setNote] = useState<Note>(),
    { state, actions } = useContext(Context)

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

  const handleOnSaveClick = () =>
    !state.saving
    && !state.saved
    && actions.upsertNote(state.notes[state.activeKey].id, note.content)

  state.saved && window.setTimeout(() => actions.endAlert(), 1000)

  return (
    <section id='Note_main_container'>
      <button id='Note_save_button_button' className={`${state.saving ? 'saving' : ''} ${state.saved ? 'saved' : ''}`} onClick={handleOnSaveClick}>
        {state.saved ? 'Saved' : 'Save'}
      </button>
      {
        note &&
        <ReactQuill id='editor'
          value={note.content}
          onChange={value => {
            if (value === note.content) return
            setNote({ ...note, id: props.Note.id, content: value })
            actions.setState(update(state, { notes: { [state.activeKey]: { content: { $set: value } } } }))
          }}
          modules={modules} />
      }
    </section>
  )
}

export default Note
