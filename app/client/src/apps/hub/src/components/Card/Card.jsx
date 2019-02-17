import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

const Card = ({ image, title, background, textColor, internal, href }) => {

  const [state, setState] = useState({ mounted: '' })

  useEffect(() => {
    setState({ ...state, mounted: 'mounted' })
  }, [state.mounted])

  return (
    <article>
      {
        internal
          ?
          <Link to={href || '/'} className={`card ${state.mounted || ''}`} name={title} style={{ background: `${background ? background : 'white'}` }}>
            <div className='card_image' >
              <img src={image} />
            </div>
            <div className='card_text'>
              <p style={{ color: `${textColor || '#333333'}` }}>{title}</p>
            </div>
          </Link>
          :
          <a className={`card ${state.mounted || ''}`} href={href || '#'} name={title} target={href && '_blank'} style={{ background: `${background ? background : 'white'}` }}>
            <div className='card_image'>
              <img src={image} />
            </div>
            <div className='card_text'>
              <p style={{ color: `${textColor || '#333333'}` }}>{title}</p>
            </div>
          </a>
      }
    </article>
  )
}

export default Card
