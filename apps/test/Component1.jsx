import React, { useContext } from 'react'
import Context from './constext'

const Component1 = props => {

  const { state, dispatch } = useContext(Context)

  console.log(state)

  return(
    <div> 
      <input type="text" name="text" value={state.text} id="2" onChange={(e) => dispatch({type: 'change', payload: e.target.value})} />
    </div>
  )
}

export default Component1
