import React, { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'

import { CardProps } from './types'

import './Card.sass'

const Card = (props: CardProps) => {

  const { card: { image, title, background= 'white', textColor = '#333333', internal, href } } = props

  const [mounted, setMounted] = useState('')
  const [imageHidden, setImageHidden] = useState(false)

  useEffect(() => {
    setMounted('mounted')
  }, [mounted])

  return (
    <section>
      {
        internal
          ?
          <Link to={href || '/'} className={`card ${mounted || ''}`} name={title} style={{ background: `${background}` }}>
            <div className='card_image' >
              <img src={image} alt='card image' />
            </div>
            <div className='card_text'>
              <p style={{ color: `${textColor}` }}>{title}</p>
            </div>
          </Link>
          :
          <a className={`card ${mounted || ''}`} href={href || '#'} target={href && '_blank'} style={{ background: `${background}` }} rel='noopener'>
            <div className='card_image'>
              <img src={image} alt='card image' className={imageHidden ? 'hidden': 'visible'} onLoad={() => setImageHidden(false)} onError={() => setImageHidden(true)}/>
            </div>
            <div className='card_text'>
              <p style={{ color: `${textColor}` }}>{title}</p>
            </div>
          </a>
      }
    </section>
  )
}

export default memo(Card)
