import React from 'react'

import './Section.sass'

const Section = props => {
  return (
    <section className='section_container' >
      <header>
        <h2> { props.title } </h2>
      </header>
      <section className='section_card_container'>
        { props.children }
      </section>
    </section>
  )
}

export default Section
