import React from 'react'

import { Link } from 'react-router-dom'

const Card = ({ image, title, color, cover, internal, href, onClick }) => {
  return (
    <article onClick={onClick}>
      {
        internal
          ?
          <Link to={href} className='card' name={title}>
            <div className={`card_image ${cover ? 'cover' : ''}`} style={{ background: `${color ? color : '#333333'}` }}>
              <img src={image} />
            </div>
            <div className='card_text'>
              <p>{title}</p>
            </div>
          </Link>
          :
          <a className='card' href={href} name={title} target='_blank' rel="noreferrer">
            <div className={`card_image ${cover ? 'cover' : ''}`} style={{ background: `${color ? color : '#333333'}` }}>
              <img src={image} />
            </div>
            <div className='card_text'>
              <p>{title}</p>
            </div>
          </a>
      }
    </article>
  )
}

export default Card
