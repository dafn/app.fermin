import React from 'react'
import { auth } from '../../api'

const Header = props => {
  return (
    <header>
      <h1>FERMIN</h1>
      <div onClick={() => auth.logout()}>
        <div id='Header_logout_button'>
          Log out
        </div>
      </div>
    </header>
  )
}

export default Header
