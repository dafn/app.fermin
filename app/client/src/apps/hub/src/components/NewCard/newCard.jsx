import React, { useState } from 'react'

import Card from '../Card'

const NewCard = ({ onCancel }) => {

  const [state, setState] = useState({
    title: '',
    href: '',
    background: '',
    textColor: '',
    image: 'f',
    internal: false
  })

  return (
    <article id='newCard_main_container'>
      <h1>
        Create New Card
      </h1>
      <div id='newCard_makecard_container'>
        <div id='newCard_preview_container'>
          <Card
            card={state}
          />
        </div>
        <div id='newCard_input_container'>
          <input placeholder='Title' onChange={event => setState({ ...state, title: event.target.value })} />
          <input placeholder='Href' onChange={event => setState({ ...state, href: event.target.value })} />
          <input placeholder='Background' onChange={event => setState({ ...state, background: event.target.value })} />
          <input placeholder='Text Color' onChange={event => setState({ ...state, textColor: event.target.value })} />
          <input placeholder='Image URL' onChange={event => setState({ ...state, image: event.target.value })} />
        </div>
      </div>
      <div id='newCard_button_container'>
        <div id='newCard_create_button'>Create</div>
        <div id='newCard_cancel_button' onClick={onCancel}>Cancel</div>
      </div>
    </article>
  )
}

export default NewCard
