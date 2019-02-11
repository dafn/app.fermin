import React from 'react'

import Context from '../../context'

const Header = props => {
  return (
    <Context.Consumer>
      {
        ({ actions: { logout } }) => {
          return (
            <header>
              <p>FERMIN</p>
              <div onClick={() => logout()}>
                <div id='Header_logout_button'>
                  Log out
                </div>
              </div>
            </header>
          )
        }
      }
    </Context.Consumer>
  )
}

export default Header