import React from 'react'
import Context from '../../context'

const UserLabel = props => {
  return (
    <Context.Consumer>
      {
        ({ store: { user } }) => {
          return (
            <div>
              <div id='UserLabel_main_container'>
                { user }
                <div id='UserLabel_detail'>Log out</div>
              </div>
            </div>

          )
        }
      }
    </Context.Consumer>

  )
}

export default UserLabel

/*
              <div id='UserLabel_main_container'>
                👤 Veronika
                <div id='UserLabel_detail'>Friend</div>
              </div>
*/