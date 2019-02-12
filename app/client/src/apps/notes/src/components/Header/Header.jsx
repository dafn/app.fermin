import React from 'react'

import Context from '../../context'

const Header = props => {
  return (
    <Context.Consumer>
      {
        ({ actions: { logout } }) => {
          return (
            <header>
              <h1>FERMIN</h1>
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