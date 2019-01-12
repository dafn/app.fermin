import React from 'react'

export const store = {
  notes: [{
    id: '',
    content: ''
  }],
  activeKey: 0,
  updateList: true,
  error: '',
  saving: false,
  user: 'dafn@outlook.com'
}

const Context = React.createContext()

export default Context
