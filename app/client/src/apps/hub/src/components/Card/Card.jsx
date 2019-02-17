import React from 'react'

import { Link } from 'react-router-dom'

const Card = ({ image, title, background, color, internal, href }) => {
  return (
    <article>
      {
        internal
          ?
          <Link to={href || '/'} className='card' name={title} style={{ background: `${background ? background : 'white'}` }}>
            <div className='card_image' >
              <img src={image} />
            </div>
            <div className='card_text'>
              <p style={{ color: `${color ? color : 'black'}` }}>{title}</p>
            </div>
          </Link>
          :
          <a className='card' href={href || '#'} name={title} target={href && '_blank'} style={{ background: `${background ? background : 'white'}` }}>
            <div className='card_image'>
              <img src={image} />
            </div>
            <div className='card_text'>
              <p style={{ color: `${color ? color : 'black'}` }}>{title}</p>
            </div>
          </a>
      }
    </article>
  )
}

export default Card
