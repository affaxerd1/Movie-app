import React from 'react'

const MovieApp = ({movie : {title, vote_average, poster_path, release_date} }) => {
  return (
    <div>
        <div className='movie-card'>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `/no-movie.png`}  alt="" />
        </div>
        
        <div className='mt-4'>
            <p className='text-white'>{title}</p>
            <div className='content'>
                <div className='rating  flex items-center space-x-2'>
                    <img src="Rating.svg" alt="Star Icon" />
                    <p className='text-white'>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>

{/* stuck at vote average not s */}
                </div>
                
                <span>•</span>
            </div>
        </div>

    </div>

    
  )
}

export default MovieApp