import React from 'react'

import Card from './src/components/Card'

import './src/sass/main.sass'

const App = props => {
  return (
    <div id='fermin_hub'>
      <section className='section' >
        <header>
          <h2> Internal Applications </h2>
        </header>
        <section id='card_container'>
          <Card />
        </section>
      </section>
    </div>
  )
}

export default App
