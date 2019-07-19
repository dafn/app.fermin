import React, { useState, useEffect } from 'react'

import Card from './src/components/Card'
import Add from './src/components/Add'
import Section from './src/components/Section'
import Loader from './src/components/Loader'
import NewCard from './src/components/NewCard'

import { datastore } from './src/api'

import './index.sass'

const App = props => {

  const [state, setState] = useState({ Card: '', newCard: false, loading: true })

  useEffect(() => {
    datastore.Cards({
      onSuccess: response => { setState({ Cards: response.Cards }) },
      onError: err => console.log('Error fetching list of Cards', err)
    })
  }, [state.Card])

  const handleOnAddCard = card => {
    datastore.addCard(card, () => {
      setState({ loading: true })
      datastore.Cards({
        onSuccess: response => { setState({ Cards: response.Cards, newCard: false }) },
        onError: err => console.log('Error fetching list of Cards', err)
      })
    })
  }

  return (
    <div id='fermin_hub'>
      <Section title='Internal Applications'>
        <Card
          card={{ title: 'Notes', href: '/app/notes', background: '#333333', textColor: 'white', image: require(`./assets/notes.png`), internal: true }}
        />
      </Section>
      <Section title='External Applications'>
        {
          state.loading && <Loader />
        }
        {
          state.Cards && state.Cards.map((card, key) => <Card key={key} card={card} />)
        }
        <Add onClick={() => setState({ ...state, newCard: true })} />
      </Section>

      <NewCard className={state.newCard && 'visible' || ''} onCreate={card => handleOnAddCard(card)} onCancel={() => setState({ ...state, newCard: false })} />
    </div>
  )
}

export default App
