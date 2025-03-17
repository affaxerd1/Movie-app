import { useEffect, useState } from 'react'
import Search from "./components/search.jsx"
import Spinner from './components/spinner.jsx';
import MovieApp from './components/MovieApp.jsx';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite.js';




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
  const [movieList, setMovieList]=useState([]);
  const [isLoading, setIsLoading]= useState(false)
  const [debauncedSearchTerm, setDebaouncedSearchTerm] = useState('')
  consr=t [getTrendingMovies, setTrendingMovies]=useState([]);

  useDebounce(()=> setDebaouncedSearchTerm(searchTerm), 5000, [searchTerm])
  //make a request to the backend to fetch the movies

  const fetchmovies = async (query='') => {

    setIsLoading(true)
    setErrorMessage('')
    try{

      const endpoint = query 
  ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
  : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    
  
      const response = await fetch(endpoint, API_OPTIONS);
      

      //throw an error is response is not ok
      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      console.log(data);

      if(data.response ===  'False'){
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
        
      }

      setMovieList(data.results || []);
      if( query && data.results.length > 0){
        await updateSearchCount(query,data.results[0]);
      }
      

    }
    catch(error){
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error Fetching movies. Please try again later')

      
    }finally {
      setIsLoading(false)
    }
  }


  // load trending movies
  const loadTrendingMovies = async ()=> {
    try {
      const movies = getTrendingMovies()
      setTrendingMovies(movies)
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    fetchmovies(debauncedSearchTerm)
  },[debauncedSearchTerm])


  useEffect(()=> {
    loadTrendingMovies();
  }, [])
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
          <h2 className='mt-[40px]'>All Movies</h2>
          
          {isLoading ? (
            <Spinner/>
                )
          : errorMessage  ? (<p className='text-red-500'>{errorMessage}</p>)
          : (  <ul>
            {movieList.map((movie )=> (
              <MovieApp key={movie.id} movie={movie}/>
            ))}
          </ul>)
          
        }

          {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        </section>
        
        
      </div>
    </main>
  )
}

export default App