import React from 'react'

const Alert = ({ message, positiveButtonText, negativeButtonText, onPositive, onNegative, activeKey }) => {
  return (
    <section id='Alert_main_container'>
      <div id='Alert_dark_screen' onClick={onNegative}></div>
      <div id='Alert_content_container'>
        <img src={require('../../../assets/alert.png')} />
        <p id='Alert_text'>
          {message}
        </p>
        <div id='Alert_buttons_container'>
          <div id='Alert_content_delete_button' onClick={() => onPositive(activeKey)}>
            {positiveButtonText}
          </div>
          <div id='Alert_content_cancel_button' onClick={onNegative}>
            {negativeButtonText}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Alert
