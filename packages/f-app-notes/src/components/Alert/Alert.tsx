import React, { memo } from 'react'

import { AlertProps } from './types'

import './Alert.sass'

const Alert = ({ message, positiveButtonText, negativeButtonText, onPositive, onNegative, activeKey }: AlertProps) => {
  return (
    <section id='Alert_main_container'>
      <div id='Alert_dark_screen' onClick={onNegative}></div>
      <div id='Alert_content_container'>
        <img src={require('../../../assets/alert.png')} />
        <p id='Alert_text'>
          {message}
        </p>
        <div id='Alert_buttons_container'>
          <button id='Alert_content_delete_button' onClick={() => onPositive(activeKey)}>
            {positiveButtonText}
          </button>
          <button id='Alert_content_cancel_button' onClick={onNegative}>
            {negativeButtonText}
          </button>
        </div>
      </div>
    </section>
  )
}

export default memo(Alert)
