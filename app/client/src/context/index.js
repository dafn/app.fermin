import React from 'react'


export const store = {
  notes: [
    '<p>this is some example text tet7654</p>',
    '<p>this is some example text</p>',
    '<p>this is some example text halla balla</p>'
  ],
  activeKey: 0,
  user: 'Daniel Alexander Nilsen'
}

const Context = React.createContext()

export default Context
