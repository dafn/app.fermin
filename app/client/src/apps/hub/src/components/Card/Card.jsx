import React from 'react'

const Card = ({ image, title, color, cover, href, onClick }) => {
  return (
    <article onClick={onClick}>
      <a className='card' href={href} name='github' target='_blank' rel="noreferrer">
        <div className={`card_image ${cover ? 'cover' : ''}`} style={{ background: `${color ? color : '#333333'}` }}>
          <img src={image} />
        </div>
        <div className='card_text'>
          <p>{title}</p>
        </div>
      </a>
    </article>
  )
}

export default Card
