import React from 'react'

const Card = props => {
  return (
    <article className='hub_card'>
      <div className='hub_card_image'>
        <img src={require('../../../assets/pen.png')} />
      </div>
      <div className='hub_card_text'>
        <p>Notes</p>
      </div>
    </article>
  )
}

export default Card