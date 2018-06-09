import React from 'react'
import loader from './loader.svg'

const Loader = () => {
  return (
    <div style={{display: 'inline'}}>
      <img
        src={loader}
        style={{width: '100px', display: 'inline'}}
        alt="Loading..."
      />
    </div>
  )
}

export default Loader
