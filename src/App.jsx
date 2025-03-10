import { useEffect, useState } from 'react'
import Search from "./components/search.jsx"

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method : 'GET',
  headers : {
    accept : 'application/json',
    authorization : `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm, setSearchTerm]= useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  //make a request to the backend to fetch the movies

  const fetchmovies = async () => {
    try{

      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      //throw an error is response is not ok
      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      console.log(data);
      

    }
    catch(error){
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error Fetching movies. Please try again later')

      
    }
  }

  useEffect(()=>{
    fetchmovies()
  },[])
  return (
    <main>
      <div className='pattern'/>

      <div className='wrapper'>
        <header>
          <img src='./hero-img.png' alt='hero Banner'/>
          <h1>Find <span className='text-gradient'>Movies</span> you'll enjoy without the hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className='all-movies'>
          <h2>All Movies</h2>
          {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        </section>
        
        
      </div>
    </main>
  )
}

export default App