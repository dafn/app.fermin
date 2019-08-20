import React from 'react'

import { SectionProps } from './types'

import './Section.sass'

const Section = ({ title, children }: SectionProps) => {
  return (
    <section className='section_container'>
      <header>
        <h2> { title } </h2>
      </header>
      <section className='section_card_container'>
        { children }
      </section>
    </section>
  )
}

export default Section
