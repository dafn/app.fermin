import React from 'react'

const Section = props => {
  return (
    <section className='section_container' >
      <header>
        <h2> { props.title } </h2>
      </header>
      <section id='section_card_container'>
        { props.children }
      </section>
    </section>
  )
}

export default Section
