import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MovieList from './components/MovieList'
import Heading from './components/Heading'
import Searchbar from './components/Searchbar'
import AddToFavorites from './components/AddToFavorites'
import RemoveFromFavorites from './components/RemoveFromFavorites'

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchterm, setSearchterm] = useState('')
  const [favorites, setFavorites] = useState([])

  const fetchMovies = async(searchterm) => {
    const response = await fetch(`http://www.omdbapi.com/?s=${searchterm}&apikey=fe4cad2f`)
    const responseJson = await response.json()
    if (responseJson.Search) {
      setMovies(responseJson.Search)
    }
  }


  useEffect( () => {
    fetchMovies(searchterm)
  }, [searchterm])

  useEffect( () => {
    const movieFavs = JSON.parse(localStorage.getItem('Fav-Movies'))
    setFavorites(movieFavs)
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('Fav-Movies', JSON.stringify(items))
  }

  const addToFavHandler = (movie) => {
    const movieExists = favorites.some(favMovie => favMovie.imdbID ===movie.imdbID)
    if (!movieExists) {
      const updatedFavorites = [...favorites, movie]
      setFavorites(updatedFavorites)
      saveToLocalStorage(updatedFavorites)
    }
  }

  const removeFromFavHandler = (movie) => {
    const updatedFavorites = favorites.filter(favmovie => favmovie.imdbID !== movie.imdbID)
    setFavorites(updatedFavorites)
    saveToLocalStorage(updatedFavorites)
  }

  return(
    <div className='container-fluid m-1'>
      <div className='header-container'>
        <Heading title='Movies'/>
        <Searchbar searchterm={searchterm} setSearchterm={setSearchterm}/>
      </div>
        {searchterm?
        <MovieList 
        movies={movies} 
        favoriteComponent={AddToFavorites}
        addToFavHandler={addToFavHandler}
        />
        :
        <div className='text'>Search for some movies.</div>
        }
        <div className='header-container'>
        <Heading title='Favorites'/>
        </div>
        <MovieList 
            movies={favorites} 
            favoriteComponent={RemoveFromFavorites}
            addToFavHandler={removeFromFavHandler}
            />
    </div>
    )
}


export default App