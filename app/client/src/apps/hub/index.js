import React, { useState } from 'react'

import Card from './src/components/Card'
import Add from './src/components/Add'
import Section from './src/components/Section'

import { datastore } from './src/api'

import './src/sass/main.sass'

const App = props => {

  const [state, setState] = useState({ Card: '' })

  if (!state.Cards)
    datastore.Cards({
      onSuccess: response => { setState({ Cards: response.Cards }) },
      onError: err => console.log('Error fetching list of Cards', err)
    })

  return (
    <div id='fermin_hub'>
      <Section title='Internal Applications'>
        {
          state.Cards && state.Cards.map((card, key) =>
            card.internal &&
            <Card
              key={key}
              title={card.title}
              internal={card.internal}
              href={card.href}
              background={card.background}
              textColor={card.textColor}
              image={card.image} />
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
              title={card.title}
              internal={card.internal}
              href={card.href}
              background={card.background}
              textColor={card.textColor}
              image={card.image} />
          )
        }
        <Add />
      </Section>
    </div>
  )
}

export default App
