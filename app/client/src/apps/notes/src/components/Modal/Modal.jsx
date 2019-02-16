import React from 'react'

const Modal = ({ message, positiveButtonText, negativeButtonText, onPositive, onNegative, activeKey }) => {
  return (
    <div id='Modal_main_container'>
      <div id='Modal_dark_screen' onClick={onNegative}></div>
      <div id='Modal_content_container'>
        <img src={require('../../../assets/alert.png')} />
        <p id='Modal_text'>
          {message}
        </p>
        <div id='Modal_buttons_container'>
          <div id='Modal_content_delete_button' onClick={() => onPositive(activeKey)}>
            {positiveButtonText}
          </div>
          <div id='Modal_content_cancel_button' onClick={onNegative}>
            {negativeButtonText}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
