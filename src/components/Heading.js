import React from 'react'
import './Heading.css'

const Heading = props => {
  return(
    <div className='h4 heading-comp'>
      {props.title}
    </div>
  )
}

export default Heading