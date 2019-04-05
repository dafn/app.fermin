import React from 'react'

const Add = ({ onClick }) => {
  return (
    <article id='add_container' onClick={onClick}>
      <h1 id='add_text'>+</h1>
    </article>
  )
}

export default Add
