import React, { useState, useEffect } from 'react'

import Card from './src/components/Card'
import Add from './src/components/Add'
import Section from './src/components/Section'

import { datastore } from './src/api'

import './src/sass/main.sass'

const App = props => {

  const [state, setState] = useState({ Card: '' })

  useEffect(() => {
    datastore.Cards({
      onSuccess: response => { setState({ Cards: response.Cards }) },
      onError: err => console.log('Error fetching list of Cards', err)
    })
  }, [state.Card])

  return (
    <div id='fermin_hub'>
      <Section title='Internal Applications'>
        {
          state.Cards && state.Cards.map((card, key) =>
            card.internal &&
            <Card
              key={key}
              card={card}
            />
          )
        }
        <Add />
      </Section>
      <Section title='External Applications'>
        {
          state.Cards && state.Cards.map((card, key) =>
            !card.internal &&
            <Card
              key={key}
              card={card}
            />
          )
        }
        <Add />
      </Section>
    </div>
  )
}

export default App
