import React, { useState, memo } from 'react'
import Card from '../Card'

import { NewCardProps, CardType } from './types'

import './NewCard.sass'

const NewCard = ({ onCancel, onCreate, className = 'visible' }: NewCardProps) => {

  const defaultState: CardType = {
    id: '',
    title: '',
    href: '',
    background: '',
    textColor: '',
    image: '',
  }

  const [state, setState] = useState<CardType>(defaultState)

  return (
    <section id='newCard_main_container' className={className}>
      <section id='newCard_left_container'>
        <div id='newCard_input_container'>
          <input placeholder='Title' value={state.title} onChange={({ target: { value } }: React.ChangeEvent<HTMLButtonElement>) => 
            setState({ ...state, title: value })} />
          <input placeholder='Href' value={state.href} onChange={({ target: { value } }: React.ChangeEvent<HTMLButtonElement>) => 
            setState({ ...state, href: value })} />
          <input placeholder='Background' value={state.background} onChange={({ target: { value } }: React.ChangeEvent<HTMLButtonElement>) => 
            setState({ ...state, background: value })} />
          <input placeholder='Text Color' value={state.textColor} onChange={({ target: { value } }: React.ChangeEvent<HTMLButtonElement>) => 
            setState({ ...state, textColor: value })} />
          <input placeholder='Image URL' value={state.image} onChange={({ target: { value } }: React.ChangeEvent<HTMLButtonElement>) => 
            setState({ ...state, image: value })} />
        </div>
        <div id='newCard_button_container'>
          <div id='newCard_create_button' onClick={() => { onCreate(state); setState(defaultState) }}>Create</div>
          <div id='newCard_cancel_button' onClick={() => { onCancel(); setState(defaultState) }}>Cancel</div>
        </div>
      </section>
      <section id='newCard_right_container'>
        <Card
          card={state}
        />
      </section>
    </section>
  )
}

export default memo(NewCard)
