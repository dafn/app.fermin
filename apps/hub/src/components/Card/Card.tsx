import React, { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'

import { CardProps } from './types'

import './Card.sass'

const Card = ({ card: { image, title, background, textColor, internal, href } }: CardProps) => {

  const [state, setState] = useState({ mounted: '', imageHidden: false })

  useEffect(() => {
    setState({...state, mounted: 'mounted' })
  }, [state.mounted])

  return (
    <article>
      {
        internal
          ?
          <Link to={href || '/'} className={`card ${state.mounted || ''}`} name={title} style={{ background: `${background || 'white'}` }}>
            <div className='card_image' >
              <img src={image} alt='card image' />
            </div>
            <div className='card_text'>
              <p style={{ color: `${textColor || '#333333'}` }}>{title}</p>
            </div>
          </Link>
          :
          <a className={`card ${state.mounted || ''}`} href={href || '#'} target={href && '_blank'} style={{ background: `${background || 'white'}` }} rel='noopener'>
            <div className='card_image'>
              <img src={image} alt='card image' className={state.imageHidden ? 'hidden': 'visible'} onLoad={() => setState({...state, imageHidden: false })} onError={() => setState({ ...state, imageHidden: true })}/>
            </div>
            <div className='card_text'>
              <p style={{ color: `${textColor || '#333333'}` }}>{title}</p>
            </div>
          </a>
      }
    </article>
  )
}

export default memo(Card)
