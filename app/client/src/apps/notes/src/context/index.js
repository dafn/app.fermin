import React from 'react'

export const store = {
  notes: [{
    id: '',
    content: ''
  }],
  activeKey: 0,
  updateList: true,
  saving: false,
  saved: false,
  alert: false
}

const Context = React.createContext()

export default Context
