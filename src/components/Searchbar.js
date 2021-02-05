import React from 'react'

const Searchbar = props => {
  return(
    <div>
      <input 
        value={props.searchterm}
        onChange={(e)=> props.setSearchterm(e.target.value)}
        className='form-control'
        placeholder='Search for movies'/>
    </div>
  )
}

export default Searchbar