import React from 'react'


export const store = {
  notes: [
    'this is some example text 432',
    'this is some example text',
    'this is some example text halla balla'
  ],
  activeKey: 1
}

const Context = React.createContext()

export default Context
