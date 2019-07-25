import React, { memo } from 'react'
import { auth } from '../../api'

import './header.sass'

const Header = () => {
  return (
    <header id='fermin_header'>
      <a href='/#' >
        <h1>FERMIN</h1>
      </a>
      <div id='Header_logout_button' onClick={() => auth.logout()}>
        Log out
      </div>
    </header>
  )
}

export default memo(Header)
