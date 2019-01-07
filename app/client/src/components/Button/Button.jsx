import React from 'react'

const Button = ({ id, onClick, children }) => {
  return (
    <div onClick={onClick}>
      <div id={id} onClick={props.addNewNote}>
        {children}
      </div>
    </div>
  )
}

export default Button
