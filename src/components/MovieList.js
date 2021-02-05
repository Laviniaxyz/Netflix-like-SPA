import React from 'react'
import './MovieList.css'

const MovieList = props => {
  const FavoriteComponent = props.favoriteComponent
  return(
    <div className='row movie-row'>
      {props.movies.map((movie, index ) => <div 
          className='poster'
          key ={index}>
        <img src={movie.Poster}/> 
        <div className='overlay' onClick={() => props.addToFavHandler(movie)}
        >
          <FavoriteComponent/>
        </div>
      </div>
      )}
    </div>
    
  )
}

export default MovieList