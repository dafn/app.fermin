import React from 'react'

const Header = props => {
  return (
    <header>
      <h2>
        { props.message }
      </h2>
    </header>
  )
}

export default Header