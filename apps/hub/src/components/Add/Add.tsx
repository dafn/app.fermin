import React from 'react'

import { AddProps } from './types'

import './Add.sass'

const Add = ({ onClick }: AddProps) => {
  return (
    <article id='add_container' onClick={onClick}>
      <h1 id='add_text'>+</h1>
    </article>
  )
}

export default Add
