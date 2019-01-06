import React from 'react'
import Context from '../../context'

const SaveButton = props => {
  return (
    <Context.Consumer>
      {
        ({ store: { user, activeKey }, actions }) => {
          return (
            <div id='SaveButton_main_container' onClick={() => actions.saveNote(activeKey) }>
              <div id='SaveButton_button' onClick={props.addNewNote}>
                Save
              </div>
            </div>

          )
        }
      }
    </Context.Consumer>

  )
}

export default SaveButton
