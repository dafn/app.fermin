import React, { useState } from 'react'
import Card from '../Card'

import './NewCard.sass'

const NewCard = ({ onCancel, onCreate, className }) => {

  const defaultState = {
    title: '',
    href: '',
    background: '',
    textColor: '',
    image: '',
    internal: false
  }

  const [state, setState] = useState(defaultState)

  return (
    <article id='newCard_main_container' className={className}>
      <div id='newCard_left_container'>
        <div id='newCard_input_container'>
          <input placeholder='Title' value={state.title} onChange={event => setState({ ...state, title: event.target.value })} />
          <input placeholder='Href' value={state.href} onChange={event => setState({ ...state, href: event.target.value })} />
          <input placeholder='Background' value={state.background} onChange={event => setState({ ...state, background: event.target.value })} />
          <input placeholder='Text Color' value={state.textColor} onChange={event => setState({ ...state, textColor: event.target.value })} />
          <input placeholder='Image URL' value={state.image} onChange={event => setState({ ...state, image: event.target.value })} />
        </div>
        <div id='newCard_button_container'>
          <div id='newCard_create_button' onClick={() => { onCreate(state); setState(defaultState) }}>Create</div>
          <div id='newCard_cancel_button' onClick={onCancel}>Cancel</div>
        </div>
      </div>
      <div id='newCard_right_container'>
        <Card
          card={state}
        />
      </div>
    </article>
  )
}

export default NewCard
