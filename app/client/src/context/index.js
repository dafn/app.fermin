import React from 'react'

import { database } from '../api'

export const store = {
  notes: [''],
  activeKey: 0,
  updateList: true,
  error: '',
  user: 'dafn@outlook.com'
}

const Context = React.createContext()

export default Context
